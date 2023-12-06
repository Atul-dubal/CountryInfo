const fs = require("fs");
const http = require('http');
const PORT = 818;

var data = fs.readFileSync(__dirname + "/api.json", "utf-8");
data = JSON.parse(data);
var htmlFile = fs.readFileSync(__dirname + "/index.html", "utf-8");


var replaceData = (htmlData, data) => {

    let newData = htmlData.replace("{%CountryName%}", data.name.common)
    newData = newData.replace("{%OfficialName%}", data.name.official)
    newData = newData.replace("{%Capital%}", data.capital)
    newData = newData.replace("{%Independent%}", data.independent)
    newData = newData.replace("{%Contients%}", data.continents)
    newData = newData.replace("{%Regien%}", data.region)
    newData = newData.replace("{%SubRegien%}", data.subregion)
    newData = newData.replace("{%Lat_Long%}", data.latlng[0] + "," + data.latlng[1])
    newData = newData.replace("{%Area%}", data.area)
    newData = newData.replace("{%Population%}", data.population)
    newData = newData.replace("{%TimeZone%}", data.timezones)
    newData = newData.replace("{%StartOfWeek%}", data.startOfWeek)
    newData = newData.replace("{%FlagImportance%}", data.flags.alt)
    newData = newData.replace("{%FlagUrl%}", data.flags.png)
    newData = newData.replace("style='visibility:hidden;'", "style='visibily:visible;' ")


    return newData;
}
var ErrorMsg = (a) => {

    a = a.replace("'color: red;visibility:hidden;", "'color: green;visibility:visible;")
    return a;
}

const server = http.createServer((req, res) => {
    var url = req.url;
    console.log(url)
    var found = 0;
    if (url.includes("?country=")) {
        url = url.split("?country=")[1]
        if (url.includes("%20")) {
            url = url.replace("%20", " ")
        }
        if (url.includes("+")) {
            url = url.replace("+", " ");
        }
        console.log(url)
        for (var i = 0; i <= 249; i++) {

            if (data[i].name.common.toLowerCase() == url.toLowerCase()) {
                var datanew = replaceData(htmlFile, data[i]);
                res.write(datanew);

                res.end();
                console.log(data[i])
                found = 1;
                break
            }

        }

        if (!found) {
            var Errormsg = ErrorMsg(htmlFile);
            res.write(Errormsg);
            res.end();
        }
    }
    else  {
        res.write(htmlFile);
        res.end();
    }

   
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is Running At Port ${PORT}`)
})

