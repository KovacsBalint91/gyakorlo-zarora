// ide deklaráljátok a függvényeket.
// Első feladat. Növekvő sorrendbe rendezni cost alapján.
function costAscBubbleSort(arr, key) {
  var newArray = arr.slice();
  var length = newArray.length;
  var change;
  while (length > 0) {
    change = 0;
    for (var j = 0; j < length; j++) {
      for (var i = j + 1; i < length; i++) {
        if ( newArray[j][key] === null) {
          newArray.push(newArray[j]);
          newArray.splice([j], 1);
        }
        if (parseInt(newArray[j][key], 10) > parseInt(newArray[i][key], 10)) {
          [newArray[j], newArray[i]] = [newArray[i], newArray[j]];

          change = j;
        }
      }
    }
    length = change;
  }
  return newArray;
}


// Második feladat. Törölni a null értékű consumables objektumokat
function deleteNullConsum(arr, key) {
  var newArray = arr.slice();
  for (var i = 0; i < newArray.length; i++) {
    if ( newArray[i][key] === null) {
      newArray.splice([i], 1);
      i--;
    }
  }
  return newArray;
}
// Harmadik feladat. Null értékeket unknownra állítani. ??? Miért módosítja az eredeti tömbömet?
function nullToUnknown(arr) {
  var newArray = arr.slice();
  for ( var i = 0; i < newArray.length; i++) {
    for ( var j in newArray[i]) {
      if (newArray[i][j] === null) {
        newArray[i][j] = 'unknown';
      }
    }
  }
  return newArray;
}
// Negyedik feladat. A hajók adatainak kiíratása.
function shipsDatas(arr) {
  console.log(nullToUnknown(costAscBubbleSort(deleteNullConsum(arr))));
}
// 5/1 feladat. 1 fős legénységgel rendelkező hajók darabszáma.
function oneManCrew(arr, key) {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === '1') {
      count++;
    }
  }
  return count++;
}

// 5/2 feladat. Legnagyobb cargo capacityvel rendelkező hajó neve.
function biggestCargo(arr, key) {
  var biggest = arr[0];
  var biggestModel = arr[0].model;
  for ( var i = 0; i < arr.length; i++) {
    if (arr[i][key] > biggest[key]) {
      arr[i].model = biggest;
    }
    return biggestModel;
  }
}

// 5/3 feladat. Az összes hajó utasainak (passengers) összesített száma
function sumPassengers(arr, key) {
  var passengers = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] !== null) {
      passengers += parseInt(arr[i][key], 10);
    }
  }
  return passengers;
}

// 5/4 feladat. A leghosszabb(lengthiness) hajó képének a neve
function longestShip(arr, key) {
  var longest = arr[0];
  var longestPic = arr[0].image;
  for ( var i = 0; i < arr.length; i++) {
    if (arr[i][key] > longest[key]) {
      longest = arr[i];
    }
  }
  return longestPic;
}

// 6. feladat. Model szerinti keresés.

// ABCbe rendezés
function modelAscSort(arr) {
  var length = arr.length;
  var change;
  while (length > 0) {
    change = 0;
    for (var j = 0; j < length; j++) {
      for (var i = j + 1; i < length; i++) {
        if (arr[j].model.toLowerCase() > arr[i].model.toLowerCase()) {
          [arr[j], arr[i]] = [arr[i], arr[j]];

          change = j;
        }
      }
    }
    length = change;
  }
  return arr;
}

// keresés
function modelSearch(key, arr) {
  var array = modelAscSort(arr);
  var input = key.toLocaleLowerCase();
  for ( var i = 0; i < array.length; i++) {
    if (array[i].model.toLocaleLowerCase().indexOf(input) !== -1) {
      console.log(array[i]);
      return;
    }
  }
  console.log('Nincs ilyen hajó');
}


// keresés2.0

/* function searchVersionTwo(input, arr) {
  modelAscSort(arr);
  var message = '';
  var userInput = input.toLocaleLowerCase();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].model.toLocaleLowerCase().indexOf('modif') !== -1) {
      message = '';
      for (var j = 0; j < arr[i].length; j++) {
        message += (`${j} : ${arr[i][j]} ${'\n'}`);
      }
      break;
    } else {
      message = 'Nincs ilyen hajó';
    }
  }
  alert(message);
}*/

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}
function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  // console.log(costAscBubbleSort(userDatas, 'cost_in_credits'));
  // console.log(deleteNullConsum(userDatas, 'consumables'));
  // console.log(shipsDatas(userDatas));
  // console.log(nullToUnknown(userDatas));
  // console.log(oneManCrew(userDatas, 'crew'));
  // console.log(biggestCargo(userDatas, 'cargo_capacity'));
  // console.log(sumPassengers(userDatas, 'passengers'));
  // console.log(longestShip(userDatas, 'lengthiness'));
  // console.log(modelSearch('Modifie', userDatas));
  modelSearch('modif', userDatas);
}
getData('/json/spaceships.json', successAjax);
