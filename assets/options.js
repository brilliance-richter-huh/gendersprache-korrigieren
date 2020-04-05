function saveOptions() {
    chrome.storage.sync.get(function (res) {
        if (res.filterliste == "Bei Bedarf" && document.querySelector("#ondemandstate").checked !== true) {
            document.querySelector("#aktiv").checked = true;
            document.querySelector("#aktiv").removeAttribute("disabled");
            document.querySelector("#skipvis").style.visibility = "visible";
            document.getElementById("aktiv-description").textContent = "Filterung aktiv";
            document.querySelector("#aktiv-description").style.color = 'inherit';
        }
        if (document.querySelector("#ondemandstate").checked == true) {
            document.querySelector("#aktiv").checked = false;
            document.querySelector("#aktiv").setAttribute("disabled", "disabled");
            document.querySelector("#skipvis").style.visibility = "hidden";
            document.querySelector("#aktiv-description").textContent = 'Filterung aktiv (Filtermodus "Nur bei Bedarf filtern" ist ausgewählt)';
            document.querySelector("#aktiv-description").style.color = 'grey';
        }
        chrome.storage.sync.set({
            aktiv: document.querySelector("#aktiv").checked,
            counter: document.querySelector("#counter").checked,
            invertiert: document.querySelector("#invertiert").checked,
            doppelformen: document.querySelector("#doppelformen").checked,
            partizip: document.querySelector("#partizip").checked,
            skip_topic: document.querySelector("#skip_topic").checked,
            filterliste: document.querySelector('input[name="filterstate"]:checked').value,
            whitelist: document.querySelector("#whitelist").value.trim(),
            blacklist: document.querySelector("#blacklist").value.trim()
        });
    });
}

function restoreOptions() {
    chrome.storage.sync.get(function (res) {
        document.querySelector("#aktiv").checked = res.aktiv;
        document.querySelector("#counter").checked = res.counter;
        document.querySelector("#invertiert").checked = res.invertiert;
        document.querySelector("#doppelformen").checked = res.doppelformen;
        document.querySelector("#partizip").checked = res.partizip;
        document.querySelector("#skip_topic").checked = res.skip_topic;
        document.querySelector("#whitelist").value = res.whitelist;
        document.querySelector("#blacklist").value = res.blacklist;

        if (res.filterliste == "Whitelist") {
            document.querySelector("#whiteliststate").checked = true;
        } else if (res.filterliste == "Blacklist") {
            document.querySelector("#blackliststate").checked = true;
        } else if (res.filterliste == "Bei Bedarf") {
            document.querySelector("#ondemandstate").checked = true;
            document.querySelector("#aktiv").checked = false;
            document.querySelector("#aktiv").setAttribute("disabled", "disabled");
            document.querySelector("#skipvis").style.visibility = "hidden";
            document.querySelector("#aktiv-description").textContent = 'Filterung aktiv (Filtermodus "Nur bei Bedarf filtern" ist ausgewählt)';
            document.querySelector("#aktiv-description").style.color = 'grey';
        } else {
            document.querySelector("#none").checked = true;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

var choices = document.querySelectorAll("input");
for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", saveOptions);
}

//Verzögerung bevor Tasteneingabe abgespeichert wird
document.querySelector("form").onkeyup = function () {
    var callcount = 0;
    var action = function () {
        saveOptions();
    };
    var delayAction = function (action, time) {
        var expectcallcount = callcount;
        var delay = function () {
            if (callcount == expectcallcount) {
                action();
            }
        };
        setTimeout(delay, time);
    };
    return function (eventtrigger) {
        ++callcount;
        delayAction(action, 1000);
    };
}();

//Chrome-spezifisches Stylesheet für options.html
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

    var link = document.createElement("link");
    link.href = "./css/chrome.css";
    link.rel = "stylesheet";

    document.getElementsByTagName("head")[0].appendChild(link);
}