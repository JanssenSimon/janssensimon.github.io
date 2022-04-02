arraydedonnees = CSVToArray(donnees);
//console.log(arraydedonnees);

Math.TAU = 2 * Math.PI;

//---cas-de-covid-2022---//

comptetestpositif2022 = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[1] == "Oui"), 0
);
comptetestnegatif2022 = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[1] == "Non"), 0
);

var data = {
  labels: [
    'Oui',
    'Non'
  ],
  datasets: [{
    label: 'Avez vous testé positif à la COVID par un test rapide ou par un test PCR *DEPUIS LE DÉBUT DE 2022*?',
    data: [comptetestpositif2022, comptetestnegatif2022],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)'
    ],
    hoverOffset: 4
  }]
};
var config = {
  type: 'pie',
  data: data,
  options: {
    aspectRatio: 0.5,
    plugins: {
      title: {
        display: true,
        text: ["Avez vous testé positif","à la COVID depuis le début","de 2022?"],
      },
      tooltip: {
        callbacks: {
          footer: function(tooltipItems) {
              var totalcircumference = 0;
              tooltipItems.forEach(tooltipItem => totalcircumference += tooltipItem.element.circumference);
              var percentage = Math.round(100 * totalcircumference / (Math.TAU));
              return percentage + "%";
          }
        }
      },
      legend: {
        display: true,
      }
    }
  }
};

var covid2022ctx = document.getElementById('covid2022chart').getContext('2d');
var covid2022chart = new Chart(covid2022ctx, config);


//---cas-de-covid-avant-2022---//

comptetestpositifpre2022 = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[3] == "Oui"), 0
);
comptetestnegatifpre2022 = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[3] == "Non"), 0
);

var data = {
  labels: [
    'Oui',
    'Non'
  ],
  datasets: [{
    label: 'Est ce que vous avez déjà eu le COVID avant 2022?',
    data: [comptetestpositifpre2022, comptetestnegatifpre2022],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)'
    ],
    hoverOffset: 4
  }]
};
var config = {
  type: 'pie',
  data: data,
  options: {
    aspectRatio: 0.5,
    plugins: {
      title: {
        display: true,
        text: ["Avez vous testé positif","à la COVID avant 2022?"],
      },
      tooltip: {
        callbacks: {
          footer: function(tooltipItems) {
              var totalcircumference = 0;
              tooltipItems.forEach(tooltipItem => totalcircumference += tooltipItem.element.circumference);
              var percentage = Math.round(100 * totalcircumference / (Math.TAU));
              return percentage + "%";
          }
        }
      },
      legend: {
        display: true,
      }
    }
  }
};

var covidpre2022ctx = document.getElementById('covidpre2022chart').getContext('2d');
var covidpre2022chart = new Chart(covidpre2022ctx, config);


//---cas-de-covid-breakdown-2022---//

function dateToString(d) {
    const mois = ["janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre"];
    return d.getDate().toString() + " " + mois[d.getMonth()];
}

var arraydedatesdepositifs = arraydedonnees.reduce(
    (accum, elem_arr) => elem_arr[2] === undefined ? accum : accum.concat([elem_arr[2]]), []
).filter(
    str => str.toString().match(/^2022-[0-9]{2}-[0-9]{2}$/)
).map(
    str => new Date(str + "T00:00:01")
);

var breakdowndates = [];
var dateslabels = [];
const now = new Date(2022, 2, 31);
var upperbound = new Date(2022, 0, 1);
for(var d = new Date(2022, 0, 1); d <= now; d.setDate(d.getDate()+10)) {
    dateslabels = dateslabels.concat([dateToString(d)]); //TODO faire jour du mois
    upperbound.setDate(d.getDate()+10);
    breakdowndates = breakdowndates.concat([arraydedatesdepositifs.reduce(
        (sum, dateenquestion) => (d<=dateenquestion && dateenquestion<upperbound) ? sum + 1 : sum, 0
    )]);
}

var data = {
  labels: dateslabels,
  datasets: [{
    //label: "Si vous avez répondu oui à la question précédente, quand avez vous testé positif *DEPUIS LE DÉBUT DE 2022*? (si vous n'êtes pas certain.e, répondez avec la date approximative)",
    label: "",
    data: breakdowndates,
    backgroundColor: [
      'rgb(255, 99, 132)'
    ],
    hoverOffset: 4
  }]
};
var config = {
  type: 'bar',
  data: data,
  options: {
    aspectRatio: 1.25,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: ["Quand avez vous testé positif depuis le début de 2022?","(si vous n'êtes pas certain.e, répondez avec","la date approximative)"],
      },
      legend: {
        display: false,
      }
    }
  }
};

var covid2022barctx = document.getElementById('covid2022barchart').getContext('2d');
var covid2022barchart = new Chart(covid2022barctx, config);


//---vaccinations---//

compte3fois = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[4] == "Oui (2 fois AVEC dose de rappel)"), 0
);
compte2fois = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[4] == "Oui (2 fois SANS dose de rappel)"), 0
);
compte1fois = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[4] == "Oui (1 fois)"), 0
);
compte0fois = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[4] == "Non"), 0
);

var data = {
  labels: [
    'Oui (2 fois AVEC dose de rappel)',
    'Oui (2 fois SANS dose de rappel)',
    'Oui (1 fois)',
    'Non'
  ],
  datasets: [{
    label: 'Êtes vous vacciné.e?',
    data: [compte3fois, compte2fois, compte1fois, compte0fois],
    backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(52, 17, 63)',
      'rgb(255, 99, 132)',
    ],
    hoverOffset: 4
  }]
};
var config = {
  type: 'pie',
  data: data,
  options: {
    aspectRatio: 0.75,
    plugins: {
      title: {
        display: true,
        text: ["Êtes vous vacciné.e?"],
      },
      tooltip: {
        callbacks: {
          footer: function(tooltipItems) {
              var totalcircumference = 0;
              tooltipItems.forEach(tooltipItem => totalcircumference += tooltipItem.element.circumference);
              var percentage = Math.round(100 * totalcircumference / (Math.TAU));
              return percentage + "%";
          }
        }
      },
      legend: {
        display: true,
      }
    }
  }
};

var vaccinationctx = document.getElementById('vaccinationchart').getContext('2d');
var vaccinationchart = new Chart(vaccinationctx, config);


//---recours---//

comptetous = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[6] == "Oui, tous"), 0
);
comptemaj = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[6] == "La majorité de mes enseignants offrent des accomodements" || curr_response[6] == "La majorité (50% ou plus) de mes enseignants offrent des accomodements"), 0
);
comptemin = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[6] == "Moins que la moitié de mes enseignants offrent des accomodements"), 0
);
compteaucun = arraydedonnees.reduce(
    (carry, curr_response) => carry + (curr_response[6] == "Non, aucun"), 0
);

var data = {
  labels: [
    'Oui, tous',
    'Plus que la moitié de mes enseignants en offrent',
    'Moins que la moitié de mes enseignants en offrent',
    'Non, aucun'
  ],
  datasets: [{
    label: "Vos enseignants offrent-ils des accomodements à leurs étudiants qui doivent s'isoler?",
    data: [comptetous, comptemaj, comptemin, compteaucun],
    backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(52, 17, 63)',
      'rgb(255, 99, 132)',
    ],
    hoverOffset: 4
  }]
};
var config = {
  type: 'pie',
  data: data,
  options: {
    aspectRatio: 0.70,
    plugins: {
      title: {
        display: true,
        text: ["Vos enseignants offrent-ils des accomodements à leurs étudiants","qui doivent s'isoler?"],
      },
      tooltip: {
        callbacks: {
          footer: function(tooltipItems) {
              var totalcircumference = 0;
              tooltipItems.forEach(tooltipItem => totalcircumference += tooltipItem.element.circumference);
              var percentage = Math.round(100 * totalcircumference / (Math.TAU));
              return percentage + "%";
          }
        }
      },
      legend: {
        display: true,
      }
    }
  }
};

var recoursctx = document.getElementById('recourschart').getContext('2d');
var recourschart = new Chart(recoursctx, config);
