// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

const donnees = `
"Horodateur","Avez vous test?? positif ?? la COVID par un test rapide ou par un test PCR *DEPUIS LE D??BUT DE 2022*?","Si vous avez r??pondu oui ?? la question pr??c??dente, quand avez vous test?? positif *DEPUIS LE D??BUT DE 2022*? (si vous n'??tes pas certain.e, r??pondez avec la date approximative)","Est ce que vous avez d??j?? eu le COVID avant 2022?","??tes vous vaccin??.e?","Si vous ??tes aux ??tudes, quel est votre programme d'??tude?","Vos enseignants offrent-ils des accomodements ?? leurs ??tudiants qui doivent s'isoler?","Si vous voulez nous faire parvenir autre chose par rapport ?? votre exp??rience avec le COVID, ??crivez le ici."
"2022/03/27 10:11:59 PM UTC???4","Oui","2022-01-01","Oui","Oui (2 fois SANS dose de rappel)","","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:31:09 PM UTC???4","Oui","2020-01-27","Oui","Oui (2 fois AVEC dose de rappel)","??tudes litt??raires","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:31:50 PM UTC???4","Oui","2022-01-31","Non","Oui (2 fois SANS dose de rappel)","Baccalaur??at en kin??siologie","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:45:20 PM UTC???4","Non","0000-01-01","Non","Oui (2 fois AVEC dose de rappel)","Bac maths info","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:45:38 PM UTC???4","Non","1999-11-11","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:50:20 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en psychologie ","La majorit?? de mes enseignants offrent des accomodements","Certains prof n'offre aucun accommodements pour la covid (pas de capsule vid??o, pas de possibilit?? de poser des questions, pas de cours en mode hybride) et donc aucun moyen de reprendre la mati??re vue en classe, ce qui est tr??s stressant lorsque les examen finaux valent 60% de la note du cours, surtout en psycho o?? le programme est super comp??titif."
"2022/03/27 10:51:11 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/27 10:51:22 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Oui, tous",""
"2022/03/27 10:51:25 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:31 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:34 PM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:37 PM UTC???4","Oui","2022-03-20","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:55 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:57 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:58 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/27 10:52:00 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:02 PM UTC???4","Oui","2022-03-06","Oui","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:03 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Computer Science","Oui, tous",""
"2022/03/27 10:52:10 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:10 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Bac Informatique ","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:11 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Computer Science ","Oui, tous",""
"2022/03/27 10:52:19 PM UTC???4","Oui","2022-03-28","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:28 PM UTC???4","Oui","2022-02-05","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Non, aucun",""
"2022/03/27 10:52:36 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise en informatique","Oui, tous",""
"2022/03/27 10:52:47 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:52 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","","Je n'ai pas r??pondu ?? la question pr??c??dente, car je ne le sais pas"
"2022/03/27 10:52:56 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique ","",""
"2022/03/27 10:53:05 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","","",""
"2022/03/27 10:53:16 PM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Computer science ","Non, aucun","Please make rest of the semester and exams online. 
Literally every one is getting covid and my friends and I feel scared and not safe to go to the classes in person."
"2022/03/27 10:53:32 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","informatique (bacc)","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:53:34 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Ma??trise en informatique (MM)","Oui, tous",""
"2022/03/27 10:53:39 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac info","Moins que la moiti?? de mes enseignants offrent des accomodements","Tant et autant que tout les enseignants ne donne pas les accommodements, je viendrais en class m??me si je suis malade."
"2022/03/27 10:53:42 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:54:08 PM UTC???4","Oui","2022-03-26","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun","J'ai aussi du m'isoler une autre fois en 2022 car ma famille est tomb??e malade"
"2022/03/27 10:54:34 PM UTC???4","Oui","2022-02-20","Non","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:54:35 PM UTC???4","Oui","2022-03-07","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique ","La majorit?? de mes enseignants offrent des accomodements","Les profs/d??mos qui n???enregistrent pas leurs cours sont des irresponsables."
"2022/03/27 10:56:31 PM UTC???4","Oui","2022-03-15","Oui","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/27 10:56:42 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:56:45 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:57:35 PM UTC???4","Oui","2022-02-27","Oui","Oui (2 fois AVEC dose de rappel)","","Non, aucun",""
"2022/03/27 10:58:00 PM UTC???4","Oui","2022-03-17","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements","On a juste un mois apres les intras avant les finaux, c'est vraiment difficile d'essayer d'accomplir toutes les t??ches quand tu attrapes le COVID (Une maladie que tu devrais te reposer assez longtemps pour r??cup??rer). Le fait que les examens et les cours ne seront en pr??sentiels n'est pas aidant. M??me si le gouv exige seulement 5 jours de quarantine, on sait que c'est vraiment pas assez pour bien r??cuperer de COVID. J'ai ??t?? positif m??me apres une semaine d'isolement en dormant tous les jours et en prenant des m??dicaments"
"2022/03/27 10:58:18 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:59:01 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 10:59:02 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 10:59:54 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Phys-Info :3","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:00:08 PM UTC???4","Non","","Non","Non","","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:01:05 PM UTC???4","Oui","2022-03-24","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Non, aucun",""
"2022/03/27 11:01:24 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac informatique","Non, aucun",""
"2022/03/27 11:01:33 PM UTC???4","Oui","2022-02-15","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements","Seulement 1 professeur ?? r??pondu a mon mail et je me suis senti compl??tement d??laiss??."
"2022/03/27 11:01:42 PM UTC???4","Oui","2022-03-24","Non","Oui (2 fois SANS dose de rappel)","MSc in Computer Science","La majorit?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:01:52 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/27 11:01:54 PM UTC???4","Non","1111-01-01","Non","Oui (2 fois SANS dose de rappel)","info","La majorit?? de mes enseignants offrent des accomodements","the form is bugged"
"2022/03/27 11:03:27 PM UTC???4","Oui","2022-01-08","Non","Oui (2 fois AVEC dose de rappel)","math info","Non, aucun",""
"2022/03/27 11:04:35 PM UTC???4","Oui","2022-03-21","Non","Oui (2 fois AVEC dose de rappel)","PhD Informatique","Oui, tous","Non disponibilit?? des tests rapids gratuits"
"2022/03/27 11:06:12 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise en informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:07:15 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements","Je m'ennuie des cours en ligne :'("
"2022/03/27 11:08:21 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Ma??trise Informatique","Oui, tous",""
"2022/03/27 11:08:52 PM UTC???4","Oui","2022-02-01","Oui","Oui (2 fois SANS dose de rappel)","math info","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:09:33 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun",""
"2022/03/27 11:10:40 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Non, aucun",""
"2022/03/27 11:12:03 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Oui, tous",""
"2022/03/27 11:12:17 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Info","Oui, tous","Merci"
"2022/03/27 11:15:04 PM UTC???4","Non","","","","","","https://bit.ly/3uxaNWO"
"2022/03/27 11:15:12 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 11:15:50 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/27 11:16:23 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maitrise en Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","Tout mon entourage est positif, j'ai les sympt??mes mais je suis n??gatif pour le moment."
"2022/03/27 11:16:47 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","BAC en sciences d'informatique ","",""
"2022/03/27 11:18:16 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements","J???aimerais plus avoir des cours en ligne, car j???ai  peur des fois d?????tre en cours avec des gens qui ne suivent pas les r??gles sanitaires. "
"2022/03/27 11:18:36 PM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise professionnelle","Oui, tous",""
"2022/03/27 11:19:31 PM UTC???4","Oui","2022-03-03","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","","Tr??s difficile davoir des exemptions"
"2022/03/27 11:19:56 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:20:36 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","bacc en informatique","",""
"2022/03/27 11:20:58 PM UTC???4","Oui","2022-02-02","Non","Oui (2 fois SANS dose de rappel)","Informatique","","Je suis en stage donc j???etais absent ?? l???udem"
"2022/03/27 11:23:11 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 11:25:44 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:26:16 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","cs student","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","plus de regle forcer sur le masque a l'universiter "
"2022/03/27 11:27:14 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:29:36 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:31:04 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Info","Oui, tous",""
"2022/03/27 11:33:26 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","informatique","Non, aucun","Il y a trop de monde ?? l'??cole et les enseignants ne portent pas de masque en classe. J'esp??re toujours suivre les cours et les examens en ligne, ce qui est plus s??r. M??me si je me fais vacciner, je serai infect??."
"2022/03/27 11:34:17 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:35:20 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/27 11:40:33 PM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","math","Non, aucun",""
"2022/03/27 11:47:22 PM UTC???4","Non","","Non","Oui (1 fois)","BAC","",""
"2022/03/27 11:47:42 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac en informatique","Oui, tous",""
"2022/03/27 11:51:58 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/27 11:54:36 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Baccalaur??at en informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:57:58 PM UTC???4","Oui","2022-01-01","Non","Oui (2 fois SANS dose de rappel)","Bac info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:01:04 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:01:14 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bachelor's in computer science","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","Je constate tout de m??me une hausse de cas de COVID chez mes proches (familles, amis, camarades...)"
"2022/03/28 12:01:56 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","phd diro","",""
"2022/03/28 12:10:51 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:16:28 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:23:59 AM UTC???4","Oui","2022-03-24","Non","Oui (2 fois SANS dose de rappel)","","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:26:26 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/28 12:34:03 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:37:08 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:37:43 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac informatique ","Non, aucun","Si on ne doit pas se pr??senter sur le campus, il devrait y avoir une fa??on de reprendre la mati??re manquer pour le bien des autres. On devrait ne pas ??tre p??naliser pour notre responsabilit?? dans cette situation. C???est ridicule."
"2022/03/28 12:44:49 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 1:02:32 AM UTC???4","Non","","Oui","Non","Math??matiques et informatique","Oui, tous",""
"2022/03/28 1:07:16 AM UTC???4","Oui","2022-02-21","Non","Oui (2 fois SANS dose de rappel)","Bac en info.","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 1:09:24 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","doctoral","Oui, tous",""
"2022/03/28 1:31:47 AM UTC???4","Oui","2022-01-15","Non","Oui (2 fois SANS dose de rappel)","neuroscience cognitive","Moins que la moiti?? de mes enseignants offrent des accomodements","on veut les ??tudes a distance , j'ai attrap?? la covid deux fois "
"2022/03/28 1:39:13 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Masters","Oui, tous",""
"2022/03/28 1:43:04 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","",""
"2022/03/28 2:13:24 AM UTC???4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","Maitrise informatique","Oui, tous",""
"2022/03/28 2:13:48 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","ma??trise en informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 2:16:05 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 2:23:39 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:46:42 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","Oui, tous",""
"2022/03/28 5:31:43 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique bac","Moins que la moiti?? de mes enseignants offrent des accomodements","COURS EN LIGNE PLSSSSS JE SOUFFRE. Il y avait plusieurs fois o?? j'avais des symptomes de COVID, mais les tests rapides sont difficiles ?? obtenir donc je n'ai jamais ??t?? confirm??, MAIS J'AI MANQU?? DES COURS et les profs ne donnent aucuns accomodements, m??me pas des enregistrements ou m??me la version remplie des powerpoints avec un prof. Ce qui est bizarre consid??rant que c'est des profs du d??partement d'informatique."
"2022/03/28 5:54:29 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:27:52 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","",""
"2022/03/28 6:30:56 AM UTC???4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:35:17 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Master's in computer science","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:38:25 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/28 6:38:51 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","ma??trise d'informatique","Oui, tous",""
"2022/03/28 6:39:45 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 6:55:14 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math et info","",""
"2022/03/28 7:02:11 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique","Oui, tous",""
"2022/03/28 7:03:13 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 7:04:29 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise en informatique ","Oui, tous",""
"2022/03/28 7:19:50 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Ma??trise en informatique","Oui, tous",""
"2022/03/28 7:21:54 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Ma??trise Informatique","Oui, tous",""
"2022/03/28 7:37:01 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Math-info","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 7:43:46 AM UTC???4","Oui","2022-01-06","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 7:48:21 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Dcotorat en informatique","Oui, tous",""
"2022/03/28 7:49:38 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 7:50:16 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Math info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:02:26 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mineure en informatique","Oui, tous",""
"2022/03/28 8:04:40 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Oui, tous",""
"2022/03/28 8:09:55 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 8:13:26 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/28 8:27:04 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","",""
"2022/03/28 8:28:26 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:29:53 AM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Maitrise","Oui, tous",""
"2022/03/28 8:30:01 AM UTC???4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","Math info","Oui, tous","Les profs sont disponibles pour rattraper la mati??re ou poser des questions alors pas de probl??me pour moi "
"2022/03/28 8:33:00 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique 3ieme cycle","","Je ne sais pas au niveau des cours, mais au niveau des d??monstrateurs (et j'imagine des enseignants), il n'y a aucune mesure en place pour si quelqu'un attrape la covid (ou pense l'avoir attrap??). J'ai d?? m'isoler et j'ai passer 1 heure ?? envoyer des courriels et essayer de rejoindre quelqu'un au departement qui pourrait m'aider car il n'y a aucune proc??dure ??crite pour ce cas. Ca pourrait ??tre bien de demander ?? l'administration de pr??parer une proc??dure ?? suivre pour les d??monstrateurs ou enseignants qui doivent s'isoler et la partager avec tous."
"2022/03/28 8:33:32 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Oui, tous",""
"2022/03/28 8:42:03 AM UTC???4","Oui","2022-02-04","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:42:38 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Info","",""
"2022/03/28 8:47:57 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bacc info-marh","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:07:14 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun",""
"2022/03/28 9:13:00 AM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Sciences biologiques ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:15:13 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:24:27 AM UTC???4","Oui","2022-01-19","Oui","Oui (2 fois SANS dose de rappel)","Bac Informatique","Oui, tous",""
"2022/03/28 9:26:36 AM UTC???4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:29:43 AM UTC???4","Oui","2022-03-14","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Oui, tous",""
"2022/03/28 9:31:19 AM UTC???4","Oui","2022-03-09","Non","Oui (2 fois SANS dose de rappel)","Bac info","",""
"2022/03/28 9:32:52 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/28 9:33:02 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","math??matiques informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:34:55 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:36:27 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en maths","","Aucune id??e sur les accomodements (je n'ai jamais ??t?? infect??)"
"2022/03/28 9:36:30 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique ","",""
"2022/03/28 9:40:17 AM UTC???4","Oui","2022-03-22","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements","Si c'est possible que les finaux soivent en ligne"
"2022/03/28 9:46:17 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:50:16 AM UTC???4","Oui","2022-02-16","Non","Oui (2 fois SANS dose de rappel)","Informatique","Oui, tous","Les demonstrations ne sont pas au point pour les etudiants qui doivent s'isoler."
"2022/03/28 9:50:25 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique et Math??matiques","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:52:42 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Non, aucun","rien, si tu n'es pas pr??sente, c'est ton probl??me"
"2022/03/28 9:59:49 AM UTC???4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Physique-informatique","Oui, tous","Je n'ai qu'un cours d'informatique et le prof offre des capsules vid??o"
"2022/03/28 10:09:01 AM UTC???4","Oui","2022-01-05","Non","Oui (2 fois SANS dose de rappel)","Doctorat en Informatique","Oui, tous","Le COVID a affect?? ma productivit??. J'ai d?? m'isoler avec ma femme et ma petite fille apr??s qu'il y ait eu une ??pid??mie dans sa garderie en janvier. Nous avions des sympt??mes grippaux et il a fallu plusieurs semaines pour que les sympt??mes d'??puisement et de courbatures disparaissent et j'ai encore parfois des p??riodes d'insomnie pendant plusieurs jours (je n'en ai jamais eu aussi intense). Nous semblons ??galement tous les trois attraper plus facilement d'autres maladies respiratoires (peut-??tre que nos syst??mes immunitaires sont encore trop sollicit??s) ou peut-??tre s'agit-il de sympt??mes r??currents de l'infection en janvier (les tests rapides sont n??gatifs depuis la mi-janvier). Suivant les directives m??dicales, ma femme et moi recevrons notre rappel 3 mois apr??s l'infection (donc d??but avril). Au d??part, nous voulions l'avoir en d??but d'ann??e."
"2022/03/28 10:09:09 AM UTC???4","Non","","","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/28 10:12:46 AM UTC???4","Oui","2022-03-01","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:18:13 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:20:59 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Ma??trise informatique","Oui, tous",""
"2022/03/28 10:21:03 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique Baccalaur??at","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:34:27 AM UTC???4","Oui","2022-03-13","Non","Oui (2 fois AVEC dose de rappel)","Math??matique et Informatique","",""
"2022/03/28 10:35:10 AM UTC???4","Oui","2022-03-02","Non","Oui (2 fois AVEC dose de rappel)","Bio-informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:38:35 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","bac en informatique","",""
"2022/03/28 10:39:12 AM UTC???4","Oui","2022-01-02","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/28 11:00:04 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math??matiques et informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:00:47 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Oui, tous",""
"2022/03/28 11:04:25 AM UTC???4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Communication et Politique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:11:52 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","Non, aucun",""
"2022/03/28 11:28:00 AM UTC???4","Non","","Non","Non","bac en info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:33:16 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","maitrise en informatique","Oui, tous",""
"2022/03/28 11:34:35 AM UTC???4","Oui","2022-03-13","Oui","Oui (2 fois SANS dose de rappel)","Ma??trise Informatique","Non, aucun","Deux sets de sympt??mes compl??tements diff??rents, la deuxi??me fois c?????tait vrmt la mort "
"2022/03/28 11:37:34 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:46:20 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","la"
"2022/03/28 11:50:43 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Math??matiques & Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 11:58:10 AM UTC???4","Oui","2022-01-05","Non","Oui (2 fois SANS dose de rappel)","Masters in Computer Science","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","-"
"2022/03/28 12:06:15 PM UTC???4","Non","","Non","","informatique","Oui, tous",""
"2022/03/28 12:08:25 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:09:22 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","MSc Informatique (th??se)","","1. ?? noter, je suis actuellement en r??daction, donc la question d'accomodement ne s'applique pas trop.

2. C'est difficile de savoir si on est vraiment n??gatif avec les tests rapides, quand on a quand m??me des sympt??mes..."
"2022/03/28 12:11:57 PM UTC???4","Oui","2022-03-26","Non","Oui (2 fois SANS dose de rappel)","PhD","Oui, tous",""
"2022/03/28 12:12:10 PM UTC???4","Oui","2022-03-12","Oui","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 12:12:44 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math & Info","Moins que la moiti?? de mes enseignants offrent des accomodements","Vraiment mal organis??, les masques et les autocollants sur les bureaux ne servent ?? rien ?? la diminution de propagation du virus. Le monde se mettent n'importe o?? dans les cours et s'en fichent des autocollants, ??a fait d??j?? 2 ans qu'on porte des masques et le monde ne savent toujours pas comment en porter malgr?? la lourdeur de la situation de COVID. Bref, exp??rience de merde dans ma premi??re ann??e d'universit??. De plus, avec les masques et mesures sanitaires, il est plus difficile de rencontrer des nouvelles personnes et de se faire des nouvelles connaissances et des amis. "
"2022/03/28 12:13:25 PM UTC???4","Oui","2022-03-25","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements","Je suis une personne tr??s ?? risques. J'ai des probl??mes d'anxi??t?? en plus de mes probl??mes cardiaques, et ??a me stresse beaucoup de voir que pas tout les professeurs mettent en place des choses pour les personnes ?? risques. "
"2022/03/28 12:18:21 PM UTC???4","Oui","2022-01-15","Non","Oui (2 fois AVEC dose de rappel)","Math-infp","Oui, tous",""
"2022/03/28 12:37:57 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Math-Info bacc","",""
"2022/03/28 12:40:18 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 12:45:19 PM UTC???4","Oui","2022-03-23","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Non, aucun",""
"2022/03/28 12:56:48 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Math-info","",""
"2022/03/28 1:03:17 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Mineure informatique","",""
"2022/03/28 1:11:30 PM UTC???4","Oui","2022-03-20","Non","Oui (2 fois AVEC dose de rappel)","Certificat Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 1:29:58 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","info bac","Moins que la moiti?? de mes enseignants offrent des accomodements","il serait bon d'avoir tout les cours en video pour eviter les absences liee a la covid /absences"
"2022/03/28 1:34:18 PM UTC???4","Oui","","Non","Oui (2 fois AVEC dose de rappel)","Bac. informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","Tann?? du **** de ****** de ***** de masque :("
"2022/03/28 1:39:07 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maths info","Non, aucun",""
"2022/03/28 1:39:56 PM UTC???4","Non","","Non","Non","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","J'en ai marre du covid :("
"2022/03/28 1:47:33 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","","",""
"2022/03/28 2:02:46 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","Oui, tous",""
"2022/03/28 2:09:22 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","math-info","Oui, tous",""
"2022/03/28 2:20:00 PM UTC???4","Oui","2022-03-23","Non","Oui (2 fois SANS dose de rappel)","Math-info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","2 sur 4 de mes cours offrent des accomodements"
"2022/03/28 2:24:05 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements","Je pr??f??re plus de cours en ligne"
"2022/03/28 2:45:31 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Majeure en informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 2:53:43 PM UTC???4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/28 3:10:36 PM UTC???4","Oui","2022-01-17","Non","Oui (2 fois AVEC dose de rappel)","bio informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:13:03 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","informatique","Oui, tous",""
"2022/03/28 3:15:26 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:24:38 PM UTC???4","Oui","2022-03-17","Non","Oui (2 fois AVEC dose de rappel)","Musique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:25:32 PM UTC???4","Non","","","","","",""
"2022/03/28 3:26:10 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Computer Science","Oui, tous",""
"2022/03/28 3:32:16 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:32:50 PM UTC???4","Oui","2022-01-23","Non","Oui (2 fois SANS dose de rappel)","Doctorat informatique ","Non, aucun",""
"2022/03/28 3:38:28 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac. en Informatique","Oui, tous","Les r??gles sont toutes bien respect??es au sein de l'universit?? et les mesures en vigueur sont appliqu??e convenablement"
"2022/03/28 4:31:14 PM UTC???4","Oui","2022-03-23","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 4:39:02 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 5:12:21 PM UTC???4","Oui","2022-02-11","Non","Oui (2 fois SANS dose de rappel)","informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 5:23:51 PM UTC???4","Oui","2022-01-10","Oui","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/28 5:45:39 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 5:48:28 PM UTC???4","Oui","2022-02-15","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements","Je suis revenue ?? l'uni apres mon diagnostique 2 jours (donc ??tant susceptible de transmettre la covid) car je me sentais pris entre le marteau et l'enclume, d'un cot?? on vous explique que vous pouvez pas ??tre plus que 2 dans une table ?? la bibliotheque car vous pouvez ??tes un vecteur potentiel (ce que je ne nie pas), de l'autre on vous refuse des accodements simples avec des excuses bureaucratiques bidon. Remplir des formulaire en ??tant malade pour que des gens avec des bullshit job qui vous demande de sauter dans des cerceau  pour justifier leur existence me rendent fou. fuck les administrateur"
"2022/03/28 6:38:49 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 6:38:49 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","",""
"2022/03/28 7:36:39 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","prog","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 7:59:26 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at Informatique","Oui, tous",""
"2022/03/28 8:12:42 PM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Ma??trise en Informatique ","Non, aucun",""
"2022/03/28 8:14:05 PM UTC???4","Non","","Non","Non","bac info","Non, aucun",""
"2022/03/28 8:27:59 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac maths-info","Non, aucun",""
"2022/03/28 8:51:06 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:53:32 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Maths & Info","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/28 9:35:17 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Baccalaur??at en informatique","",""
"2022/03/28 9:42:57 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math??matiques et physique","Non, aucun",""
"2022/03/28 11:41:34 PM UTC???4","Non","","Oui","Non","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 1:54:40 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 11:11:21 AM UTC???4","Oui","2022-03-28","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 11:27:13 AM UTC???4","Oui","2022-02-28","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en informatique","Moins que la moiti?? de mes enseignants offrent des accomodements","Mes examens intras on ??t?? d??cal??. En revanche un seul cours proposait des enregistrements de l'ann??e pr??c??dente pour continuer ?? suivre le cours."
"2022/03/29 12:02:13 PM UTC???4","Oui","2022-03-22","Non","Non","Sciences biologiques","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements","C???est tr??s stressant avec l???approche des examens et ??a nous emp??che d?????tre au max de sa forme "
"2022/03/29 12:48:00 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Phys info","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 1:42:09 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat","",""
"2022/03/29 2:24:02 PM UTC???4","Oui","2022-01-03","Non","Oui (2 fois AVEC dose de rappel)","baccalaur??at en informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 2:31:56 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en Virologie et Immunologie","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 3:23:28 PM UTC???4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","Communication","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 3:57:19 PM UTC???4","Oui","2022-01-05","Non","Oui (2 fois AVEC dose de rappel)","Math??matique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 4:15:49 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/29 4:17:07 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 4:17:47 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","BAC Mathematiques","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:26:15 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math Info","Non, aucun","Pr??sentement malade, mais test n??gatif"
"2022/03/29 4:32:49 PM UTC???4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","Mathematiques","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:33:15 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maths","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 4:35:14 PM UTC???4","Oui","2022-03-22","Non","Oui (2 fois SANS dose de rappel)","Enseignement ","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:35:54 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","","Oui, tous",""
"2022/03/29 4:55:20 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Physique","",""
"2022/03/29 5:01:54 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Physique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 5:01:58 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math phys","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 6:11:40 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Soins infirmiers","Oui, tous",""
"2022/03/29 6:12:35 PM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac maths phys","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 6:31:46 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math??matiques et physiques ","",""
"2022/03/29 6:35:58 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac ??criture de sc??nario et cr??ation litt??raire","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 7:36:33 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/29 11:36:05 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math??matiques et Physique","",""
"2022/03/30 12:04:09 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","c??gep th????tre","Oui, tous",""
"2022/03/30 12:49:10 AM UTC???4","Oui","2022-03-21","Non","Oui (2 fois AVEC dose de rappel)","physique","Oui, tous","j'ai juste ??crit a un prof car je devais manquer un labo, en ce qui concerne les autres je ne sais pas s'ils offrent des accommodements pour les ??l??ves qui doivent s'isoler."
"2022/03/30 9:44:36 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","",""
"2022/03/30 10:07:39 AM UTC???4","Oui","2022-03-23","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/03/30 10:33:01 AM UTC???4","Oui","2022-03-17","Non","Oui (2 fois AVEC dose de rappel)","Communications","Non, aucun","J'ai inform?? tous.tes mes professeur.e.s de ma situation et leur ai demand?? de pouvoir suivre le cours en Zoom (audio) afin d???avoir acc??s aux notions discut??es. Aucun des 5 ne m???a accommod??. Litt??ralement tous m???ont promis d???enregistrer le cours et de me l???envoyer mais ??a n???a pas fonctionn??, ils ne m???ont envoy?? que des excuses disant que je devais aller chercher le cours cz mes coll??gues. Vrmt un manque de respect."
"2022/03/30 11:20:24 AM UTC???4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Physique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 3:44:08 PM UTC???4","Non","","Non","","informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 4:28:59 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 4:50:51 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalaur??at en physique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/31 3:12:01 PM UTC???4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Math??matiques et Informatique","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/04/01 9:26:38 AM UTC???4","Non","","Non","Oui (2 fois SANS dose de rappel)","informatique","",""
"2022/04/01 11:07:48 AM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique","Oui, tous",""
"2022/04/01 11:09:18 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Doctorat en informatique","",""
"2022/04/01 11:11:55 AM UTC???4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Moins que la moiti?? de mes enseignants offrent des accomodements",""
"2022/04/02 1:27:11 PM UTC???4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maitrise en informatique","Oui, tous",""
"2022/04/02 2:10:36 PM UTC???4","Oui","2022-01-20","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorit?? (50% ou plus) de mes enseignants offrent des accomodements",""
`
