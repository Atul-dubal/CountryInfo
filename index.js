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

    if (url == "/") {
        res.write(htmlFile);
        res.end();
    }

    else {

        var urlArray = url.split("/?country=")
        console.log(urlArray)
        var org_search = ((urlArray[1]) + "").replaceAll("%20", " ");
        var org_search = ((urlArray[1]) + "").replaceAll("+", " ");

        console.log((urlArray[1]) + "ok")
        console.log(org_search.toLowerCase())

        for (var i = 0; i <= 249; i++) {

            if (data[i].name.common.toLowerCase() == org_search.toLowerCase()) {
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
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is Running At Port ${PORT}`)
})

