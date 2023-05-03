const pool = require('../db')

const loadLgasTable = async () => {
    let conn;
    try {
        conn = await pool.connect()
        const checkSql = 'SELECT COUNT(*) FROM lgas';
        const rows = await conn.query(checkSql)
        const rowCount = rows.rows[0].count
        if (rowCount == 0) {
            const insertSql = `INSERT INTO lgas (lga,state_id)
            VALUES 
            ('Aba North',1),
            ('Aba South',1),
            ('Arochukwu',1),
            ('Bende',1),
            ('Ikwuano',1),
            ('Isiala Ngwa North',1),
            ('Isiala Ngwa South',1),
            ('Isuikwuato',1),
            ('Obi Ngwa',1),
            ('Ohafia',1),
            ('Osisioma',1),
            ('Ugwunagbo',1),
            ('Ukwa East',1),
            ('Ukwa West',1),
            ('Umuahia North',1),
            ('Umuahia South',1),
            ('Umu Nneochi',1),
            ('Demsa',2),
            ('Fufure',2),
            ('Ganye',2),
            ('Gayuk',2),
            ('Gombi',2),
            ('Grie',2),
            ('Hong',2),
            ('Jada',2),
            ('Lamurde',2),
            ('Madagali',2),
            ('Maiha',2),
            ('Mayo Belwa',2),
            ('Michika',2),
            ('Mubi North',2),
            ('Mubi South',2),
            ('Numan',2),
            ('Shelleng',2),
            ('Song',2),
            ('Toungo',2),
            ('Yola North',2),
            ('Yola South',2),
            ('Abak',3),
            ('Eastern Obolo',3),
            ('Eket',3),
            ('Esit Eket',3),
            ('Essien Udim',3),
            ('Etim Ekpo',3),
            ('Etinan',3),
            ('Ibeno',3),
            ('Ibesikpo Asutan',3),
            ('Ibiono-Ibom',3),
            ('Ika',3),
            ('Ikono',3),
            ('Ikot Abasi',3),
            ('Ikot Ekpene',3),
            ('Ini',3),
            ('Itu',3),
            ('Mbo',3),
            ('Mkpat-Enin',3),
            ('Nsit-Atai',3),
            ('Nsit-Ibom',3),
            ('Nsit-Ubium',3),
            ('Obot Akara',3),
            ('Okobo',3),
            ('Onna',3),
            ('Oron',3),
            ('Oruk Anam',3),
            ('Udung-Uko',3),
            ('Ukanafun',3),
            ('Uruan',3),
            ('Urue-Offong/Oruko',3),
            ('Uyo',3),
            ('Aguata',4),
            ('Anambra East',4),
            ('Anambra West',4),
            ('Anaocha',4),
            ('Awka North',4),
            ('Awka South',4),
            ('Ayamelum',4),
            ('Dunukofia',4),
            ('Ekwusigo',4),
            ('Idemili North',4),
            ('Idemili South',4),
            ('Ihiala',4),
            ('Njikoka',4),
            ('Nnewi North',4),
            ('Nnewi South',4),
            ('Ogbaru',4),
            ('Onitsha North',4),
            ('Onitsha South',4),
            ('Orumba North',4),
            ('Orumba South',4),
            ('Oyi',4),
            ('Alkaleri',5),
            ('Bauchi',5),
            ('Bogoro',5),
            ('Damban',5),
            ('Darazo',5),
            ('Dass',5),
            ('Gamawa',5),
            ('Ganjuwa',5),
            ('Giade',5),
            ('Itas/Gadau',5),
            ('Jama are',5),
            ('Katagum',5),
            ('Kirfi',5),
            ('Misau',5),
            ('Ningi',5),
            ('Shira',5),
            ('Tafawa Balewa',5),
            ('Toro',5),
            ('Warji',5),
            ('Zaki',5),
            ('Brass',6),
            ('Ekeremor',6),
            ('Kolokuma/Opokuma',6),
            ('Nembe',6),
            ('Ogbia',6),
            ('Sagbama',6),
            ('Southern Ijaw',6),
            ('Yenagoa',6),
            ('Agatu',7),
            ('Apa',7),
            ('Ado',7),
            ('Buruku',7),
            ('Gboko',7),
            ('Guma',7),
            ('Gwer East',7),
            ('Gwer West',7),
            ('Katsina-Ala',7),
            ('Konshisha',7),
            ('Kwande',7),
            ('Logo',7),
            ('Makurdi',7),
            ('Obi',7),
            ('Ogbadibo',7),
            ('Ohimini',7),
            ('Oju',7),
            ('Okpokwu',7),
            ('Oturkpo',7),
            ('Tarka',7),
            ('Ukum',7),
            ('Ushongo',7),
            ('Vandeikya',7),
            ('Abadam',8),
            ('Askira/Uba',8),
            ('Bama',8),
            ('Bayo',8),
            ('Biu',8),
            ('Chibok',8),
            ('Damboa',8),
            ('Dikwa',8),
            ('Gubio',8),
            ('Guzamala',8),
            ('Gwoza',8),
            ('Hawul',8),
            ('Jere',8),
            ('Kaga',8),
            ('Kala/Balge',8),
            ('Konduga',8),
            ('Kukawa',8),
            ('Kwaya Kusar',8),
            ('Mafa',8),
            ('Magumeri',8),
            ('Maiduguri',8),
            ('Marte',8),
            ('Mobbar',8),
            ('Monguno',8),
            ('Ngala',8),
            ('Nganzai',8),
            ('Shani',8),
            ('Abi',9),
            ('Akamkpa',9),
            ('Akpabuyo',9),
            ('Bakassi',9),
            ('Bekwarra',9),
            ('Biase',9),
            ('Boki',9),
            ('Calabar Municipal',9),
            ('Calabar South',9),
            ('Etung',9),
            ('Ikom',9),
            ('Obanliku',9),
            ('Obubra',9),
            ('Obudu',9),
            ('Odukpani',9),
            ('Ogoja',9),
            ('Yakuur',9),
            ('Yala',9),
            ('Aniocha North',10),
            ('Aniocha South',10),
            ('Bomadi',10),
            ('Burutu',10),
            ('Ethiope East',10),
            ('Ethiope West',10),
            ('Ika North East',10),
            ('Ika South',10),
            ('Isoko North',10),
            ('Isoko South',10),
            ('Ndokwa East',10),
            ('Ndokwa West',10),
            ('Okpe',10),
            ('Oshimili North',10),
            ('Oshimili South',10),
            ('Patani',10),
            ('Sapele',10),
            ('Udu',10),
            ('Ughelli North',10),
            ('Ughelli South',10),
            ('Ukwuani',10),
            ('Uvwie',10),
            ('Warri North',10),
            ('Warri South',10),
            ('Warri South West',10),
            ('Abakaliki',11),
            ('Afikpo North',11),
            ('Afikpo South',11),
            ('Ebonyi',11),
            ('Ezza North',11),
            ('Ezza South',11),
            ('Ikwo',11),
            ('Ishielu',11),
            ('Ivo',11),
            ('Izzi',11),
            ('Ohaozara',11),
            ('Ohaukwu',11),
            ('Onicha',11),
            ('Akoko-Edo',12),
            ('Egor',12),
            ('Esan Central',12),
            ('Esan North-East',12),
            ('Esan South-East',12),
            ('Esan West',12),
            ('Etsako Central',12),
            ('Etsako East',12),
            ('Etsako West',12),
            ('Igueben',12),
            ('Ikpoba Okha',12),
            ('Orhionmwon',12),
            ('Oredo',12),
            ('Ovia North-East',12),
            ('Ovia South-West',12),
            ('Owan East',12),
            ('Owan West',12),
            ('Uhunmwonde',12),
            ('Ado Ekiti',13),
            ('Efon',13),
            ('Ekiti East',13),
            ('Ekiti South-West',13),
            ('Ekiti West',13),
            ('Emure',13),
            ('Gbonyin',13),
            ('Ido Osi',13),
            ('Ijero',13),
            ('Ikere',13),
            ('Ikole',13),
            ('Ilejemeje',13),
            ('Irepodun/Ifelodun',13),
            ('Ise/Orun',13),
            ('Moba',13),
            ('Oye',13),
            ('Aninri',14),
            ('Awgu',14),
            ('Enugu East',14),
            ('Enugu North',14),
            ('Enugu South',14),
            ('Ezeagu',14),
            ('Igbo Etiti',14),
            ('Igbo Eze North',14),
            ('Igbo Eze South',14),
            ('Isi Uzo',14),
            ('Nkanu East',14),
            ('Nkanu West',14),
            ('Nsukka',14),
            ('Oji River',14),
            ('Udenu',14),
            ('Udi',14),
            ('Uzo Uwani',14),
            ('Akko',15),
            ('Balanga',15),
            ('Billiri',15),
            ('Dukku',15),
            ('Funakaye',15),
            ('Gombe',15),
            ('Kaltungo',15),
            ('Kwami',15),
            ('Nafada',15),
            ('Shongom',15),
            ('Yamaltu/Deba',15),
            ('Aboh Mbaise',16),
            ('Ahiazu Mbaise',16),
            ('Ehime Mbano',16),
            ('Ezinihitte',16),
            ('Ideato North',16),
            ('Ideato South',16),
            ('Ihitte/Uboma',16),
            ('Ikeduru',16),
            ('Isiala Mbano',16),
            ('Isu',16),
            ('Mbaitoli',16),
            ('Ngor Okpala',16),
            ('Njaba',16),
            ('Nkwerre',16),
            ('Nwangele',16),
            ('Obowo',16),
            ('Oguta',16),
            ('Ohaji/Egbema',16),
            ('Okigwe',16),
            ('Orlu',16),
            ('Orsu',16),
            ('Oru East',16),
            ('Oru West',16),
            ('Owerri Municipal',16),
            ('Owerri North',16),
            ('Owerri West',16),
            ('Unuimo',16),
            ('Auyo',17),
            ('Babura',17),
            ('Biriniwa',17),
            ('Birnin Kudu',17),
            ('Buji',17),
            ('Dutse',17),
            ('Gagarawa',17),
            ('Garki',17),
            ('Gumel',17),
            ('Guri',17),
            ('Gwaram',17),
            ('Gwiwa',17),
            ('Hadejia',17),
            ('Jahun',17),
            ('Kafin Hausa',17),
            ('Kazaure',17),
            ('Kiri Kasama',17),
            ('Kiyawa',17),
            ('Kaugama',17),
            ('Maigatari',17),
            ('Malam Madori',17),
            ('Miga',17),
            ('Ringim',17),
            ('Roni',17),
            ('Sule Tankarkar',17),
            ('Taura',17),
            ('Yankwashi',17),
            ('Birnin Gwari',18),
            ('Chikun',18),
            ('Giwa',18),
            ('Igabi',18),
            ('Ikara',18),
            ('Jaba',18),
            ('Jema a',18),
            ('Kachia',18),
            ('Kaduna North',18),
            ('Kaduna South',18),
            ('Kagarko',18),
            ('Kajuru',18),
            ('Kaura',18),
            ('Kauru',18),
            ('Kubau',18),
            ('Kudan',18),
            ('Lere',18),
            ('Makarfi',18),
            ('Sabon Gari',18),
            ('Sanga',18),
            ('Soba',18),
            ('Zangon Kataf',18),
            ('Zaria',18),
            ('Ajingi',19),
            ('Albasu',19),
            ('Bagwai',19),
            ('Bebeji',19),
            ('Bichi',19),
            ('Bunkure',19),
            ('Dala',19),
            ('Dambatta',19),
            ('Dawakin Kudu',19),
            ('Dawakin Tofa',19),
            ('Doguwa',19),
            ('Fagge',19),
            ('Gabasawa',19),
            ('Garko',19),
            ('Garun Mallam',19),
            ('Gaya',19),
            ('Gezawa',19),
            ('Gwale',19),
            ('Gwarzo',19),
            ('Kabo',19),
            ('Kano Municipal',19),
            ('Karaye',19),
            ('Kibiya',19),
            ('Kiru',19),
            ('Kumbotso',19),
            ('Kunchi',19),
            ('Kura',19),
            ('Madobi',19),
            ('Makoda',19),
            ('Minjibir',19),
            ('Nasarawa',19),
            ('Rano',19),
            ('Rimin Gado',19),
            ('Rogo',19),
            ('Shanono',19),
            ('Sumaila',19),
            ('Takai',19),
            ('Tarauni',19),
            ('Tofa',19),
            ('Tsanyawa',19),
            ('Tudun Wada',19),
            ('Ungogo',19),
            ('Warawa',19),
            ('Wudil',19),
            ('Bakori',20),
            ('Batagarawa',20),
            ('Batsari',20),
            ('Baure',20),
            ('Bindawa',20),
            ('Charanchi',20),
            ('Dandume',20),
            ('Danja',20),
            ('Dan Musa',20),
            ('Daura',20),
            ('Dutsi',20),
            ('Dutsin Ma',20),
            ('Faskari',20),
            ('Funtua',20),
            ('Ingawa',20),
            ('Jibia',20),
            ('Kafur',20),
            ('Kaita',20),
            ('Kankara',20),
            ('Kankia',20),
            ('Katsina',20),
            ('Kurfi',20),
            ('Kusada',20),
            ('Mai Adua',20),
            ('Malumfashi',20),
            ('Mani',20),
            ('Mashi',20),
            ('Matazu',20),
            ('Musawa',20),
            ('Rimi',20),
            ('Sabuwa',20),
            ('Safana',20),
            ('Sandamu',20),
            ('Zango',20),
            ('Aleiro',21),
            ('Arewa Dandi',21),
            ('Argungu',21),
            ('Augie',21),
            ('Bagudo',21),
            ('Birnin Kebbi',21),
            ('Bunza',21),
            ('Dandi',21),
            ('Fakai',21),
            ('Gwandu',21),
            ('Jega',21),
            ('Kalgo',21),
            ('Koko/Besse',21),
            ('Maiyama',21),
            ('Ngaski',21),
            ('Sakaba',21),
            ('Shanga',21),
            ('Suru',21),
            ('Wasagu/Danko',21),
            ('Yauri',21),
            ('Zuru',21),
            ('Adavi',22),
            ('Ajaokuta',22),
            ('Ankpa',22),
            ('Bassa',22),
            ('Dekina',22),
            ('Ibaji',22),
            ('Idah',22),
            ('Igalamela Odolu',22),
            ('Ijumu',22),
            ('Kabba/Bunu',22),
            ('Kogi',22),
            ('Lokoja',22),
            ('Mopa Muro',22),
            ('Ofu',22),
            ('Ogori/Magongo',22),
            ('Okehi',22),
            ('Okene',22),
            ('Olamaboro',22),
            ('Omala',22),
            ('Yagba East',22),
            ('Yagba West',22),
            ('Asa',23),
            ('Baruten',23),
            ('Edu',23),
            ('Ekiti',23),
            ('Ifelodun',23),
            ('Ilorin East',23),
            ('Ilorin South',23),
            ('Ilorin West',23),
            ('Irepodun',23),
            ('Isin',23),
            ('Kaiama',23),
            ('Moro',23),
            ('Offa',23),
            ('Oke Ero',23),
            ('Oyun',23),
            ('Pategi',23),
            ('Agege',24),
            ('Ajeromi-Ifelodun',24),
            ('Alimosho',24),
            ('Amuwo-Odofin',24),
            ('Apapa',24),
            ('Badagry',24),
            ('Epe',24),
            ('Eti Osa',24),
            ('Ibeju-Lekki',24),
            ('Ifako-Ijaiye',24),
            ('Ikeja',24),
            ('Ikorodu',24),
            ('Kosofe',24),
            ('Lagos Island',24),
            ('Lagos Mainland',24),
            ('Mushin',24),
            ('Ojo',24),
            ('Oshodi-Isolo',24),
            ('Shomolu',24),
            ('Surulere',24),
            ('Akwanga',25),
            ('Awe',25),
            ('Doma',25),
            ('Karu',25),
            ('Keana',25),
            ('Keffi',25),
            ('Kokona',25),
            ('Lafia',25),
            ('Nasarawa',25),
            ('Nasarawa Egon',25),
            ('Obi',25),
            ('Toto',25),
            ('Wamba',25),
            ('Agaie',26),
            ('Agwara',26),
            ('Bida',26),
            ('Borgu',26),
            ('Bosso',26),
            ('Chanchaga',26),
            ('Edati',26),
            ('Gbako',26),
            ('Gurara',26),
            ('Katcha',26),
            ('Kontagora',26),
            ('Lapai',26),
            ('Lavun',26),
            ('Magama',26),
            ('Mariga',26),
            ('Mashegu',26),
            ('Mokwa',26),
            ('Moya',26),
            ('Paikoro',26),
            ('Rafi',26),
            ('Rijau',26),
            ('Shiroro',26),
            ('Suleja',26),
            ('Tafa',26),
            ('Wushishi',26),
            ('Abeokuta North',27),
            ('Abeokuta South',27),
            ('Ado-Odo/Ota',27),
            ('Egbado North',27),
            ('Egbado South',27),
            ('Ewekoro',27),
            ('Ifo',27),
            ('Ijebu East',27),
            ('Ijebu North',27),
            ('Ijebu North East',27),
            ('Ijebu Ode',27),
            ('Ikenne',27),
            ('Imeko Afon',27),
            ('Ipokia',27),
            ('Obafemi Owode',27),
            ('Odeda',27),
            ('Odogbolu',27),
            ('Ogun Waterside',27),
            ('Remo North',27),
            ('Shagamu',27),
            ('Akoko North-East',28),
            ('Akoko North-West',28),
            ('Akoko South-West',28),
            ('Akoko South-East',28),
            ('Akure North',28),
            ('Akure South',28),
            ('Ese Odo',28),
            ('Idanre',28),
            ('Ifedore',28),
            ('Ilaje',28),
            ('Ile Oluji/Okeigbo',28),
            ('Irele',28),
            ('Odigbo',28),
            ('Okitipupa',28),
            ('Ondo East',28),
            ('Ondo West',28),
            ('Ose',28),
            ('Owo',28),
            ('Atakunmosa East',29),
            ('Atakunmosa West',29),
            ('Aiyedaade',29),
            ('Aiyedire',29),
            ('Boluwaduro',29),
            ('Boripe',29),
            ('Ede North',29),
            ('Ede South',29),
            ('Ife Central',29),
            ('Ife East',29),
            ('Ife North',29),
            ('Ife South',29),
            ('Egbedore',29),
            ('Ejigbo',29),
            ('Ifedayo',29),
            ('Ifelodun',29),
            ('Ila',29),
            ('Ilesa East',29),
            ('Ilesa West',29),
            ('Irepodun',29),
            ('Irewole',29),
            ('Isokan',29),
            ('Iwo',29),
            ('Obokun',29),
            ('Odo Otin',29),
            ('Ola Oluwa',29),
            ('Olorunda',29),
            ('Oriade',29),
            ('Orolu',29),
            ('Osogbo',29),
            ('Afijio',30),
            ('Akinyele',30),
            ('Atiba',30),
            ('Atisbo',30),
            ('Egbeda',30),
            ('Ibadan North',30),
            ('Ibadan North-East',30),
            ('Ibadan North-West',30),
            ('Ibadan South-East',30),
            ('Ibadan South-West',30),
            ('Ibarapa Central',30),
            ('Ibarapa East',30),
            ('Ibarapa North',30),
            ('Ido',30),
            ('Irepo',30),
            ('Iseyin',30),
            ('Itesiwaju',30),
            ('Iwajowa',30),
            ('Kajola',30),
            ('Lagelu',30),
            ('Ogbomosho North',30),
            ('Ogbomosho South',30),
            ('Ogo Oluwa',30),
            ('Olorunsogo',30),
            ('Oluyole',30),
            ('Ona Ara',30),
            ('Orelope',30),
            ('Ori Ire',30),
            ('Oyo',30),
            ('Oyo East',30),
            ('Saki East',30),
            ('Saki West',30),
            ('Surulere',30),
            ('Bokkos',31),
            ('Barkin Ladi',31),
            ('Bassa',31),
            ('Jos East',31),
            ('Jos North',31),
            ('Jos South',31),
            ('Kanam',31),
            ('Kanke',31),
            ('Langtang South',31),
            ('Langtang North',31),
            ('Mangu',31),
            ('Mikang',31),
            ('Pankshin',31),
            ('Qua an Pan',31),
            ('Riyom',31),
            ('Shendam',31),
            ('Wase',31),
            ('Abua/Odual',32),
            ('Ahoada East',32),
            ('Ahoada West',32),
            ('Akuku-Toru',32),
            ('Andoni',32),
            ('Asari-Toru',32),
            ('Bonny',32),
            ('Degema',32),
            ('Eleme',32),
            ('Emuoha',32),
            ('Etche',32),
            ('Gokana',32),
            ('Ikwerre',32),
            ('Khana',32),
            ('Obio/Akpor',32),
            ('Ogba/Egbema/Ndoni',32),
            ('Ogu/Bolo',32),
            ('Okrika',32),
            ('Omuma',32),
            ('Opobo/Nkoro',32),
            ('Oyigbo',32),
            ('Port Harcourt',32),
            ('Tai',32),
            ('Binji',33),
            ('Bodinga',33),
            ('Dange Shuni',33),
            ('Gada',33),
            ('Goronyo',33),
            ('Gudu',33),
            ('Gwadabawa',33),
            ('Illela',33),
            ('Isa',33),
            ('Kebbe',33),
            ('Kware',33),
            ('Rabah',33),
            ('Sabon Birni',33),
            ('Shagari',33),
            ('Silame',33),
            ('Sokoto North',33),
            ('Sokoto South',33),
            ('Tambuwal',33),
            ('Tangaza',33),
            ('Tureta',33),
            ('Wamako',33),
            ('Wurno',33),
            ('Yabo',33),
            ('Ardo Kola',34),
            ('Bali',34),
            ('Donga',34),
            ('Gashaka',34),
            ('Gassol',34),
            ('Ibi',34),
            ('Jalingo',34),
            ('Karim Lamido',34),
            ('Kumi',34),
            ('Lau',34),
            ('Sardauna',34),
            ('Takum',34),
            ('Ussa',34),
            ('Wukari',34),
            ('Yorro',34),
            ('Zing',34),
            ('Bade',35),
            ('Bursari',35),
            ('Damaturu',35),
            ('Fika',35),
            ('Fune',35),
            ('Geidam',35),
            ('Gujba',35),
            ('Gulani',35),
            ('Jakusko',35),
            ('Karasuwa',35),
            ('Machina',35),
            ('Nangere',35),
            ('Nguru',35),
            ('Potiskum',35),
            ('Tarmuwa',35),
            ('Yunusari',35),
            ('Yusufari',35),
            ('Anka',36),
            ('Bakura',36),
            ('Birnin Magaji/Kiyaw',36),
            ('Bukkuyum',36),
            ('Bungudu',36),
            ('Gummi',36),
            ('Gusau',36),
            ('Kaura Namoda',36),
            ('Maradun',36),
            ('Maru',36),
            ('Shinkafi',36),
            ('Talata Mafara',36),
            ('Chafe',36),
            ('Zurmi',36),
            ('Abaji',37),
            ('Bwari',37),
            ('Gwagwalada',37),
            ('Kuje',37),
            ('Kwali',37),
            ('Municipal Area Council',37)           
            RETURNING *;`;
            const result = await conn.query(insertSql)
            console.log('Lgas Table loaded successfully');
        }
        console.log('Lgas Table Already loaded');
    } catch (error) {
        console.log(error);
    }
    finally {
        conn.release()
    }

}

loadLgasTable()
module.exports = loadLgasTable