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
"Horodateur","Avez vous testé positif à la COVID par un test rapide ou par un test PCR *DEPUIS LE DÉBUT DE 2022*?","Si vous avez répondu oui à la question précédente, quand avez vous testé positif *DEPUIS LE DÉBUT DE 2022*? (si vous n'êtes pas certain.e, répondez avec la date approximative)","Est ce que vous avez déjà eu le COVID avant 2022?","Êtes vous vacciné.e?","Si vous êtes aux études, quel est votre programme d'étude?","Vos enseignants offrent-ils des accomodements à leurs étudiants qui doivent s'isoler?","Si vous voulez nous faire parvenir autre chose par rapport à votre expérience avec le COVID, écrivez le ici."
"2022/03/27 10:11:59 PM UTC−4","Oui","2022-01-01","Oui","Oui (2 fois SANS dose de rappel)","","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:31:09 PM UTC−4","Oui","2020-01-27","Oui","Oui (2 fois AVEC dose de rappel)","études littéraires","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:31:50 PM UTC−4","Oui","2022-01-31","Non","Oui (2 fois SANS dose de rappel)","Baccalauréat en kinésiologie","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:45:20 PM UTC−4","Non","0000-01-01","Non","Oui (2 fois AVEC dose de rappel)","Bac maths info","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:45:38 PM UTC−4","Non","1999-11-11","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:50:20 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en psychologie ","La majorité de mes enseignants offrent des accomodements","Certains prof n'offre aucun accommodements pour la covid (pas de capsule vidéo, pas de possibilité de poser des questions, pas de cours en mode hybride) et donc aucun moyen de reprendre la matière vue en classe, ce qui est très stressant lorsque les examen finaux valent 60% de la note du cours, surtout en psycho où le programme est super compétitif."
"2022/03/27 10:51:11 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/27 10:51:22 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Oui, tous",""
"2022/03/27 10:51:25 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:31 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:34 PM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:37 PM UTC−4","Oui","2022-03-20","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:55 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:57 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:51:58 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/27 10:52:00 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:02 PM UTC−4","Oui","2022-03-06","Oui","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:03 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Computer Science","Oui, tous",""
"2022/03/27 10:52:10 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:10 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Bac Informatique ","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:11 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Computer Science ","Oui, tous",""
"2022/03/27 10:52:19 PM UTC−4","Oui","2022-03-28","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:28 PM UTC−4","Oui","2022-02-05","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Non, aucun",""
"2022/03/27 10:52:36 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise en informatique","Oui, tous",""
"2022/03/27 10:52:47 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:52:52 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","","Je n'ai pas répondu à la question précédente, car je ne le sais pas"
"2022/03/27 10:52:56 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique ","",""
"2022/03/27 10:53:05 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","","",""
"2022/03/27 10:53:16 PM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Computer science ","Non, aucun","Please make rest of the semester and exams online. 
Literally every one is getting covid and my friends and I feel scared and not safe to go to the classes in person."
"2022/03/27 10:53:32 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","informatique (bacc)","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:53:34 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Maîtrise en informatique (MM)","Oui, tous",""
"2022/03/27 10:53:39 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac info","Moins que la moitié de mes enseignants offrent des accomodements","Tant et autant que tout les enseignants ne donne pas les accommodements, je viendrais en class même si je suis malade."
"2022/03/27 10:53:42 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:54:08 PM UTC−4","Oui","2022-03-26","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun","J'ai aussi du m'isoler une autre fois en 2022 car ma famille est tombée malade"
"2022/03/27 10:54:34 PM UTC−4","Oui","2022-02-20","Non","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:54:35 PM UTC−4","Oui","2022-03-07","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique ","La majorité de mes enseignants offrent des accomodements","Les profs/démos qui n’enregistrent pas leurs cours sont des irresponsables."
"2022/03/27 10:56:31 PM UTC−4","Oui","2022-03-15","Oui","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/27 10:56:42 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 10:56:45 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:57:35 PM UTC−4","Oui","2022-02-27","Oui","Oui (2 fois AVEC dose de rappel)","","Non, aucun",""
"2022/03/27 10:58:00 PM UTC−4","Oui","2022-03-17","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements","On a juste un mois apres les intras avant les finaux, c'est vraiment difficile d'essayer d'accomplir toutes les tâches quand tu attrapes le COVID (Une maladie que tu devrais te reposer assez longtemps pour récupérer). Le fait que les examens et les cours ne seront en présentiels n'est pas aidant. Même si le gouv exige seulement 5 jours de quarantine, on sait que c'est vraiment pas assez pour bien récuperer de COVID. J'ai été positif même apres une semaine d'isolement en dormant tous les jours et en prenant des médicaments"
"2022/03/27 10:58:18 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:59:01 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 10:59:02 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 10:59:54 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Phys-Info :3","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 11:00:08 PM UTC−4","Non","","Non","Non","","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 11:01:05 PM UTC−4","Oui","2022-03-24","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Non, aucun",""
"2022/03/27 11:01:24 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac informatique","Non, aucun",""
"2022/03/27 11:01:33 PM UTC−4","Oui","2022-02-15","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements","Seulement 1 professeur à répondu a mon mail et je me suis senti complètement délaissé."
"2022/03/27 11:01:42 PM UTC−4","Oui","2022-03-24","Non","Oui (2 fois SANS dose de rappel)","MSc in Computer Science","La majorité de mes enseignants offrent des accomodements",""
"2022/03/27 11:01:52 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/27 11:01:54 PM UTC−4","Non","1111-01-01","Non","Oui (2 fois SANS dose de rappel)","info","La majorité de mes enseignants offrent des accomodements","the form is bugged"
"2022/03/27 11:03:27 PM UTC−4","Oui","2022-01-08","Non","Oui (2 fois AVEC dose de rappel)","math info","Non, aucun",""
"2022/03/27 11:04:35 PM UTC−4","Oui","2022-03-21","Non","Oui (2 fois AVEC dose de rappel)","PhD Informatique","Oui, tous","Non disponibilité des tests rapids gratuits"
"2022/03/27 11:06:12 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise en informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:07:15 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements","Je m'ennuie des cours en ligne :'("
"2022/03/27 11:08:21 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Maîtrise Informatique","Oui, tous",""
"2022/03/27 11:08:52 PM UTC−4","Oui","2022-02-01","Oui","Oui (2 fois SANS dose de rappel)","math info","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 11:09:33 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun",""
"2022/03/27 11:10:40 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Non, aucun",""
"2022/03/27 11:12:03 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique","Oui, tous",""
"2022/03/27 11:12:17 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Info","Oui, tous","Merci"
"2022/03/27 11:15:04 PM UTC−4","Non","","","","","","https://bit.ly/3uxaNWO"
"2022/03/27 11:15:12 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 11:15:50 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/27 11:16:23 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maitrise en Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements","Tout mon entourage est positif, j'ai les symptômes mais je suis négatif pour le moment."
"2022/03/27 11:16:47 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","BAC en sciences d'informatique ","",""
"2022/03/27 11:18:16 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moitié de mes enseignants offrent des accomodements","J’aimerais plus avoir des cours en ligne, car j’ai  peur des fois d’être en cours avec des gens qui ne suivent pas les règles sanitaires. "
"2022/03/27 11:18:36 PM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise professionnelle","Oui, tous",""
"2022/03/27 11:19:31 PM UTC−4","Oui","2022-03-03","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","","Très difficile davoir des exemptions"
"2022/03/27 11:19:56 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en Informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 11:20:36 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","bacc en informatique","",""
"2022/03/27 11:20:58 PM UTC−4","Oui","2022-02-02","Non","Oui (2 fois SANS dose de rappel)","Informatique","","Je suis en stage donc j’etais absent à l’udem"
"2022/03/27 11:23:11 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/27 11:25:44 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:26:16 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","cs student","La majorité (50% ou plus) de mes enseignants offrent des accomodements","plus de regle forcer sur le masque a l'universiter "
"2022/03/27 11:27:14 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 11:29:36 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:31:04 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Info","Oui, tous",""
"2022/03/27 11:33:26 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","informatique","Non, aucun","Il y a trop de monde à l'école et les enseignants ne portent pas de masque en classe. J'espère toujours suivre les cours et les examens en ligne, ce qui est plus sûr. Même si je me fais vacciner, je serai infecté."
"2022/03/27 11:34:17 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:35:20 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/27 11:40:33 PM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","math","Non, aucun",""
"2022/03/27 11:47:22 PM UTC−4","Non","","Non","Oui (1 fois)","BAC","",""
"2022/03/27 11:47:42 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac en informatique","Oui, tous",""
"2022/03/27 11:51:58 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/27 11:54:36 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Baccalauréat en informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/27 11:57:58 PM UTC−4","Oui","2022-01-01","Non","Oui (2 fois SANS dose de rappel)","Bac info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:01:04 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:01:14 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bachelor's in computer science","La majorité (50% ou plus) de mes enseignants offrent des accomodements","Je constate tout de même une hausse de cas de COVID chez mes proches (familles, amis, camarades...)"
"2022/03/28 12:01:56 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","phd diro","",""
"2022/03/28 12:10:51 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:16:28 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:23:59 AM UTC−4","Oui","2022-03-24","Non","Oui (2 fois SANS dose de rappel)","","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:26:26 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","",""
"2022/03/28 12:34:03 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:37:08 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:37:43 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac informatique ","Non, aucun","Si on ne doit pas se présenter sur le campus, il devrait y avoir une façon de reprendre la matière manquer pour le bien des autres. On devrait ne pas être pénaliser pour notre responsabilité dans cette situation. C’est ridicule."
"2022/03/28 12:44:49 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 1:02:32 AM UTC−4","Non","","Oui","Non","Mathématiques et informatique","Oui, tous",""
"2022/03/28 1:07:16 AM UTC−4","Oui","2022-02-21","Non","Oui (2 fois SANS dose de rappel)","Bac en info.","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 1:09:24 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","doctoral","Oui, tous",""
"2022/03/28 1:31:47 AM UTC−4","Oui","2022-01-15","Non","Oui (2 fois SANS dose de rappel)","neuroscience cognitive","Moins que la moitié de mes enseignants offrent des accomodements","on veut les études a distance , j'ai attrapé la covid deux fois "
"2022/03/28 1:39:13 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Masters","Oui, tous",""
"2022/03/28 1:43:04 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","",""
"2022/03/28 2:13:24 AM UTC−4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","Maitrise informatique","Oui, tous",""
"2022/03/28 2:13:48 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","maîtrise en informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 2:16:05 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 2:23:39 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:46:42 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","Oui, tous",""
"2022/03/28 5:31:43 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique bac","Moins que la moitié de mes enseignants offrent des accomodements","COURS EN LIGNE PLSSSSS JE SOUFFRE. Il y avait plusieurs fois où j'avais des symptomes de COVID, mais les tests rapides sont difficiles à obtenir donc je n'ai jamais été confirmé, MAIS J'AI MANQUÉ DES COURS et les profs ne donnent aucuns accomodements, même pas des enregistrements ou même la version remplie des powerpoints avec un prof. Ce qui est bizarre considérant que c'est des profs du département d'informatique."
"2022/03/28 5:54:29 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:27:52 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","",""
"2022/03/28 6:30:56 AM UTC−4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:35:17 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Master's in computer science","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 6:38:25 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Oui, tous",""
"2022/03/28 6:38:51 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","maîtrise d'informatique","Oui, tous",""
"2022/03/28 6:39:45 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 6:55:14 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math et info","",""
"2022/03/28 7:02:11 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique","Oui, tous",""
"2022/03/28 7:03:13 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 7:04:29 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise en informatique ","Oui, tous",""
"2022/03/28 7:19:50 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Maîtrise en informatique","Oui, tous",""
"2022/03/28 7:21:54 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maîtrise Informatique","Oui, tous",""
"2022/03/28 7:37:01 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Math-info","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 7:43:46 AM UTC−4","Oui","2022-01-06","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 7:48:21 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Dcotorat en informatique","Oui, tous",""
"2022/03/28 7:49:38 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 7:50:16 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Math info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:02:26 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mineure en informatique","Oui, tous",""
"2022/03/28 8:04:40 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Oui, tous",""
"2022/03/28 8:09:55 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 8:13:26 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/28 8:27:04 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","",""
"2022/03/28 8:28:26 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:29:53 AM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Maitrise","Oui, tous",""
"2022/03/28 8:30:01 AM UTC−4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","Math info","Oui, tous","Les profs sont disponibles pour rattraper la matière ou poser des questions alors pas de problème pour moi "
"2022/03/28 8:33:00 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique 3ieme cycle","","Je ne sais pas au niveau des cours, mais au niveau des démonstrateurs (et j'imagine des enseignants), il n'y a aucune mesure en place pour si quelqu'un attrape la covid (ou pense l'avoir attrapé). J'ai dû m'isoler et j'ai passer 1 heure à envoyer des courriels et essayer de rejoindre quelqu'un au departement qui pourrait m'aider car il n'y a aucune procédure écrite pour ce cas. Ca pourrait être bien de demander à l'administration de préparer une procédure à suivre pour les démonstrateurs ou enseignants qui doivent s'isoler et la partager avec tous."
"2022/03/28 8:33:32 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Oui, tous",""
"2022/03/28 8:42:03 AM UTC−4","Oui","2022-02-04","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:42:38 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Info","",""
"2022/03/28 8:47:57 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bacc info-marh","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:07:14 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","Non, aucun",""
"2022/03/28 9:13:00 AM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Sciences biologiques ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:15:13 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:24:27 AM UTC−4","Oui","2022-01-19","Oui","Oui (2 fois SANS dose de rappel)","Bac Informatique","Oui, tous",""
"2022/03/28 9:26:36 AM UTC−4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:29:43 AM UTC−4","Oui","2022-03-14","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Oui, tous",""
"2022/03/28 9:31:19 AM UTC−4","Oui","2022-03-09","Non","Oui (2 fois SANS dose de rappel)","Bac info","",""
"2022/03/28 9:32:52 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/28 9:33:02 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","mathématiques informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:34:55 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:36:27 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en maths","","Aucune idée sur les accomodements (je n'ai jamais été infecté)"
"2022/03/28 9:36:30 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique ","",""
"2022/03/28 9:40:17 AM UTC−4","Oui","2022-03-22","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moitié de mes enseignants offrent des accomodements","Si c'est possible que les finaux soivent en ligne"
"2022/03/28 9:46:17 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 9:50:16 AM UTC−4","Oui","2022-02-16","Non","Oui (2 fois SANS dose de rappel)","Informatique","Oui, tous","Les demonstrations ne sont pas au point pour les etudiants qui doivent s'isoler."
"2022/03/28 9:50:25 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique et Mathématiques","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:52:42 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","Non, aucun","rien, si tu n'es pas présente, c'est ton problème"
"2022/03/28 9:59:49 AM UTC−4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Physique-informatique","Oui, tous","Je n'ai qu'un cours d'informatique et le prof offre des capsules vidéo"
"2022/03/28 10:09:01 AM UTC−4","Oui","2022-01-05","Non","Oui (2 fois SANS dose de rappel)","Doctorat en Informatique","Oui, tous","Le COVID a affecté ma productivité. J'ai dû m'isoler avec ma femme et ma petite fille après qu'il y ait eu une épidémie dans sa garderie en janvier. Nous avions des symptômes grippaux et il a fallu plusieurs semaines pour que les symptômes d'épuisement et de courbatures disparaissent et j'ai encore parfois des périodes d'insomnie pendant plusieurs jours (je n'en ai jamais eu aussi intense). Nous semblons également tous les trois attraper plus facilement d'autres maladies respiratoires (peut-être que nos systèmes immunitaires sont encore trop sollicités) ou peut-être s'agit-il de symptômes récurrents de l'infection en janvier (les tests rapides sont négatifs depuis la mi-janvier). Suivant les directives médicales, ma femme et moi recevrons notre rappel 3 mois après l'infection (donc début avril). Au départ, nous voulions l'avoir en début d'année."
"2022/03/28 10:09:09 AM UTC−4","Non","","","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/28 10:12:46 AM UTC−4","Oui","2022-03-01","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:18:13 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:20:59 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Maîtrise informatique","Oui, tous",""
"2022/03/28 10:21:03 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique Baccalauréat","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:34:27 AM UTC−4","Oui","2022-03-13","Non","Oui (2 fois AVEC dose de rappel)","Mathématique et Informatique","",""
"2022/03/28 10:35:10 AM UTC−4","Oui","2022-03-02","Non","Oui (2 fois AVEC dose de rappel)","Bio-informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 10:38:35 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","bac en informatique","",""
"2022/03/28 10:39:12 AM UTC−4","Oui","2022-01-02","Non","Oui (2 fois AVEC dose de rappel)","Informatique","",""
"2022/03/28 11:00:04 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mathématiques et informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:00:47 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","informatique","Oui, tous",""
"2022/03/28 11:04:25 AM UTC−4","Oui","2022-03-25","Non","Oui (2 fois AVEC dose de rappel)","Communication et Politique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:11:52 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Informatique ","Non, aucun",""
"2022/03/28 11:28:00 AM UTC−4","Non","","Non","Non","bac en info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:33:16 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","maitrise en informatique","Oui, tous",""
"2022/03/28 11:34:35 AM UTC−4","Oui","2022-03-13","Oui","Oui (2 fois SANS dose de rappel)","Maîtrise Informatique","Non, aucun","Deux sets de symptômes complètements différents, la deuxième fois c’était vrmt la mort "
"2022/03/28 11:37:34 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 11:46:20 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","info","La majorité (50% ou plus) de mes enseignants offrent des accomodements","la"
"2022/03/28 11:50:43 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Mathématiques & Informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 11:58:10 AM UTC−4","Oui","2022-01-05","Non","Oui (2 fois SANS dose de rappel)","Masters in Computer Science","La majorité (50% ou plus) de mes enseignants offrent des accomodements","-"
"2022/03/28 12:06:15 PM UTC−4","Non","","Non","","informatique","Oui, tous",""
"2022/03/28 12:08:25 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 12:09:22 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","MSc Informatique (thèse)","","1. À noter, je suis actuellement en rédaction, donc la question d'accomodement ne s'applique pas trop.

2. C'est difficile de savoir si on est vraiment négatif avec les tests rapides, quand on a quand même des symptômes..."
"2022/03/28 12:11:57 PM UTC−4","Oui","2022-03-26","Non","Oui (2 fois SANS dose de rappel)","PhD","Oui, tous",""
"2022/03/28 12:12:10 PM UTC−4","Oui","2022-03-12","Oui","Oui (2 fois SANS dose de rappel)","informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 12:12:44 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math & Info","Moins que la moitié de mes enseignants offrent des accomodements","Vraiment mal organisé, les masques et les autocollants sur les bureaux ne servent à rien à la diminution de propagation du virus. Le monde se mettent n'importe où dans les cours et s'en fichent des autocollants, ça fait déjà 2 ans qu'on porte des masques et le monde ne savent toujours pas comment en porter malgré la lourdeur de la situation de COVID. Bref, expérience de merde dans ma première année d'université. De plus, avec les masques et mesures sanitaires, il est plus difficile de rencontrer des nouvelles personnes et de se faire des nouvelles connaissances et des amis. "
"2022/03/28 12:13:25 PM UTC−4","Oui","2022-03-25","Oui","Oui (2 fois AVEC dose de rappel)","Informatique ","Moins que la moitié de mes enseignants offrent des accomodements","Je suis une personne très à risques. J'ai des problèmes d'anxiété en plus de mes problèmes cardiaques, et ça me stresse beaucoup de voir que pas tout les professeurs mettent en place des choses pour les personnes à risques. "
"2022/03/28 12:18:21 PM UTC−4","Oui","2022-01-15","Non","Oui (2 fois AVEC dose de rappel)","Math-infp","Oui, tous",""
"2022/03/28 12:37:57 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Math-Info bacc","",""
"2022/03/28 12:40:18 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac en informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 12:45:19 PM UTC−4","Oui","2022-03-23","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Non, aucun",""
"2022/03/28 12:56:48 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Math-info","",""
"2022/03/28 1:03:17 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Mineure informatique","",""
"2022/03/28 1:11:30 PM UTC−4","Oui","2022-03-20","Non","Oui (2 fois AVEC dose de rappel)","Certificat Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 1:29:58 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","info bac","Moins que la moitié de mes enseignants offrent des accomodements","il serait bon d'avoir tout les cours en video pour eviter les absences liee a la covid /absences"
"2022/03/28 1:34:18 PM UTC−4","Oui","","Non","Oui (2 fois AVEC dose de rappel)","Bac. informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements","Tanné du **** de ****** de ***** de masque :("
"2022/03/28 1:39:07 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maths info","Non, aucun",""
"2022/03/28 1:39:56 PM UTC−4","Non","","Non","Non","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements","J'en ai marre du covid :("
"2022/03/28 1:47:33 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","","",""
"2022/03/28 2:02:46 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","Oui, tous",""
"2022/03/28 2:09:22 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","math-info","Oui, tous",""
"2022/03/28 2:20:00 PM UTC−4","Oui","2022-03-23","Non","Oui (2 fois SANS dose de rappel)","Math-info","La majorité (50% ou plus) de mes enseignants offrent des accomodements","2 sur 4 de mes cours offrent des accomodements"
"2022/03/28 2:24:05 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements","Je préfère plus de cours en ligne"
"2022/03/28 2:45:31 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Majeure en informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 2:53:43 PM UTC−4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/28 3:10:36 PM UTC−4","Oui","2022-01-17","Non","Oui (2 fois AVEC dose de rappel)","bio informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:13:03 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","informatique","Oui, tous",""
"2022/03/28 3:15:26 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:24:38 PM UTC−4","Oui","2022-03-17","Non","Oui (2 fois AVEC dose de rappel)","Musique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:25:32 PM UTC−4","Non","","","","","",""
"2022/03/28 3:26:10 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Computer Science","Oui, tous",""
"2022/03/28 3:32:16 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 3:32:50 PM UTC−4","Oui","2022-01-23","Non","Oui (2 fois SANS dose de rappel)","Doctorat informatique ","Non, aucun",""
"2022/03/28 3:38:28 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac. en Informatique","Oui, tous","Les règles sont toutes bien respectées au sein de l'université et les mesures en vigueur sont appliquée convenablement"
"2022/03/28 4:31:14 PM UTC−4","Oui","2022-03-23","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 4:39:02 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 5:12:21 PM UTC−4","Oui","2022-02-11","Non","Oui (2 fois SANS dose de rappel)","informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 5:23:51 PM UTC−4","Oui","2022-01-10","Oui","Oui (2 fois AVEC dose de rappel)","","Oui, tous",""
"2022/03/28 5:45:39 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 5:48:28 PM UTC−4","Oui","2022-02-15","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements","Je suis revenue à l'uni apres mon diagnostique 2 jours (donc étant susceptible de transmettre la covid) car je me sentais pris entre le marteau et l'enclume, d'un coté on vous explique que vous pouvez pas être plus que 2 dans une table à la bibliotheque car vous pouvez êtes un vecteur potentiel (ce que je ne nie pas), de l'autre on vous refuse des accodements simples avec des excuses bureaucratiques bidon. Remplir des formulaire en étant malade pour que des gens avec des bullshit job qui vous demande de sauter dans des cerceau  pour justifier leur existence me rendent fou. fuck les administrateur"
"2022/03/28 6:38:49 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 6:38:49 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en informatique","",""
"2022/03/28 7:36:39 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","prog","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 7:59:26 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat Informatique","Oui, tous",""
"2022/03/28 8:12:42 PM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Maîtrise en Informatique ","Non, aucun",""
"2022/03/28 8:14:05 PM UTC−4","Non","","Non","Non","bac info","Non, aucun",""
"2022/03/28 8:27:59 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Bac maths-info","Non, aucun",""
"2022/03/28 8:51:06 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/28 8:53:32 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Maths & Info","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/28 9:35:17 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Baccalauréat en informatique","",""
"2022/03/28 9:42:57 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mathématiques et physique","Non, aucun",""
"2022/03/28 11:41:34 PM UTC−4","Non","","Oui","Non","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 1:54:40 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 11:11:21 AM UTC−4","Oui","2022-03-28","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 11:27:13 AM UTC−4","Oui","2022-02-28","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en informatique","Moins que la moitié de mes enseignants offrent des accomodements","Mes examens intras on été décalé. En revanche un seul cours proposait des enregistrements de l'année précédente pour continuer à suivre le cours."
"2022/03/29 12:02:13 PM UTC−4","Oui","2022-03-22","Non","Non","Sciences biologiques","La majorité (50% ou plus) de mes enseignants offrent des accomodements","C’est très stressant avec l’approche des examens et ça nous empêche d’être au max de sa forme "
"2022/03/29 12:48:00 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Phys info","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 1:42:09 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat","",""
"2022/03/29 2:24:02 PM UTC−4","Oui","2022-01-03","Non","Oui (2 fois AVEC dose de rappel)","baccalauréat en informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 2:31:56 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Doctorat en Virologie et Immunologie","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 3:23:28 PM UTC−4","Oui","2022-03-22","Non","Oui (2 fois AVEC dose de rappel)","Communication","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 3:57:19 PM UTC−4","Oui","2022-01-05","Non","Oui (2 fois AVEC dose de rappel)","Mathématique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 4:15:49 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","","",""
"2022/03/29 4:17:07 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 4:17:47 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","BAC Mathematiques","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:26:15 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math Info","Non, aucun","Présentement malade, mais test négatif"
"2022/03/29 4:32:49 PM UTC−4","Oui","2022-03-27","Non","Oui (2 fois AVEC dose de rappel)","Mathematiques","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:33:15 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maths","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 4:35:14 PM UTC−4","Oui","2022-03-22","Non","Oui (2 fois SANS dose de rappel)","Enseignement ","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 4:35:54 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","","Oui, tous",""
"2022/03/29 4:55:20 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Physique","",""
"2022/03/29 5:01:54 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Physique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 5:01:58 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math phys","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 6:11:40 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Soins infirmiers","Oui, tous",""
"2022/03/29 6:12:35 PM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","Bac maths phys","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 6:31:46 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mathématiques et physiques ","",""
"2022/03/29 6:35:58 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac écriture de scénario et création littéraire","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/29 7:36:33 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/29 11:36:05 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Mathématiques et Physique","",""
"2022/03/30 12:04:09 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","cégep théâtre","Oui, tous",""
"2022/03/30 12:49:10 AM UTC−4","Oui","2022-03-21","Non","Oui (2 fois AVEC dose de rappel)","physique","Oui, tous","j'ai juste écrit a un prof car je devais manquer un labo, en ce qui concerne les autres je ne sais pas s'ils offrent des accommodements pour les élèves qui doivent s'isoler."
"2022/03/30 9:44:36 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Math-info","",""
"2022/03/30 10:07:39 AM UTC−4","Oui","2022-03-23","Oui","Oui (2 fois AVEC dose de rappel)","Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/03/30 10:33:01 AM UTC−4","Oui","2022-03-17","Non","Oui (2 fois AVEC dose de rappel)","Communications","Non, aucun","J'ai informé tous.tes mes professeur.e.s de ma situation et leur ai demandé de pouvoir suivre le cours en Zoom (audio) afin d’avoir accès aux notions discutées. Aucun des 5 ne m’a accommodé. Littéralement tous m’ont promis d’enregistrer le cours et de me l’envoyer mais ça n’a pas fonctionné, ils ne m’ont envoyé que des excuses disant que je devais aller chercher le cours cz mes collègues. Vrmt un manque de respect."
"2022/03/30 11:20:24 AM UTC−4","Oui","2022-03-28","Non","Oui (2 fois AVEC dose de rappel)","Physique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 3:44:08 PM UTC−4","Non","","Non","","informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 4:28:59 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/30 4:50:51 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Baccalauréat en physique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
"2022/03/31 3:12:01 PM UTC−4","Non","","Oui","Oui (2 fois AVEC dose de rappel)","Mathématiques et Informatique","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/04/01 9:26:38 AM UTC−4","Non","","Non","Oui (2 fois SANS dose de rappel)","informatique","",""
"2022/04/01 11:07:48 AM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Bac informatique","Oui, tous",""
"2022/04/01 11:09:18 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Doctorat en informatique","",""
"2022/04/01 11:11:55 AM UTC−4","Non","","Oui","Oui (2 fois SANS dose de rappel)","Informatique ","Moins que la moitié de mes enseignants offrent des accomodements",""
"2022/04/02 1:27:11 PM UTC−4","Non","","Non","Oui (2 fois AVEC dose de rappel)","Maitrise en informatique","Oui, tous",""
"2022/04/02 2:10:36 PM UTC−4","Oui","2022-01-20","Non","Oui (2 fois SANS dose de rappel)","Informatique","La majorité (50% ou plus) de mes enseignants offrent des accomodements",""
`
