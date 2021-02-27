document.addEventListener("DOMContentLoaded", init)

function init(){
  
    let btnSend = document.querySelector('.send');
    let btnReset = document.querySelector('.reset');
    let input = document.querySelector('.inputRequest');
    let checkboxCounter = [];

    function sendRequest(method, url, body = null){
        return fetch(url).then(response => {
            return response.json();
        })
    }

    //отображаем данные
    const showData = (data) => {
        document.querySelector('.content').innerHTML = `<table class="data"></table>`;
        let headerRow = document.createElement('tr');
        headerRow.className = 'header-row';
        document.querySelector('.data').appendChild(headerRow);
        let headerRowTh = document.createElement('th');
        headerRowTh.innerHTML = `<th>№</th>`;
        headerRow.appendChild(headerRowTh);
        for(key in data[0]){
            headerRowTh = document.createElement('th');
            headerRowTh.innerHTML = `<th>${key}</th>`;
            headerRow.appendChild(headerRowTh);
            headerRow.appendChild(headerRowTh);
        }

        for(i in data){
            let row = document.createElement('tr');
            row.innerHTML = `<td>${parseInt(i)+1}</td>`;
            document.querySelector('.data').appendChild(row);
            for (key in data[i]) {
                let rowTd = document.createElement('td');
                rowTd.innerHTML = `${data[i][key]}`;
                if(`${data[i][key]}`.includes('http')){
                    rowTd.innerHTML = `<a href='${data[i][key]}' target='_blank'>${data[i][key]}</a>`;
                }
                row.appendChild(rowTd);
            }
            let rowTdCheck = document.createElement('td');
            rowTdCheck.innerHTML = `<div>
                <input type="checkbox" id="save" name="save">
                <label for="save">Сохранить в мой список</label>
            </div>`;
            row.appendChild(rowTdCheck);
        }

        //Подсчет чекбоксов
        let checkboxArr = Array.from(document.getElementsByName('save'));
        checkboxArr.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                if(checkbox.checked == true){
                    checkboxCounter.push('checked');
                    document.querySelector('.checkbox-counter').innerText = `Отмечено чекбоксов: ${checkboxCounter.length}`;
                } else {
                    checkboxCounter.pop();
                    document.querySelector('.checkbox-counter').innerText = `Отмечено чекбоксов: ${checkboxCounter.length}`;
                }
            })
        })
    }

    //получаем данные
    btnSend.addEventListener('click', () => {
        document.getElementById('title').innerText = 'Результат запроса';
        checkboxCounter = [];
        document.querySelector('.checkbox-counter').innerText = `Отмечено чекбоксов: ${checkboxCounter.length}`;
        let request = `http://universities.hipolabs.com/search?country=${input.value}`;
        url = request;
        sendRequest('GET', url)
        .then(data => {
            showData(data);
        })
    })

    //сброс
    btnReset.addEventListener('click', () => {
        document.querySelector('.data').remove();
        document.getElementById('title').innerText = '';
        checkboxCounter = [];
        document.querySelector('.checkbox-counter').innerText = '';
        input.value = '';
    })
}