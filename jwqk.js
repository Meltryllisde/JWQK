const Authorization = document.cookie.split('=')[1];
const XGXKLB = { 默认: 0, A: 12, B: 13, C: 14, D: 15, E: 16, F: 17, A0: 18 };
const classT = 'XGKC';//专选：TJKC 公选：XGKC 跨选：FAWKC
const Batchid = '5457852c392e4fb0bc162402c1047701';
var selectElement = document.createElement('select');
selectElement.id = 'classID';
for (let i in XGXKLB) {
    var optionElement = document.createElement('option');
    optionElement.value = XGXKLB[i];
    optionElement.text = i;
    selectElement.appendChild(optionElement);
}
selectElement.style.cssText = 'position: absolute; height: 25px; width: 50px; top: 77px; left:700px; text-align: center; z-index: 99999;';
document.body.appendChild(selectElement);

var inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.placeholder = '请输入关键字';
inputElement.style.cssText = 'position: absolute; height: 25px; width: 200px; top: 75px; left:760px; text-align: center; overflow: hidden; z-index: 99999;';
document.body.appendChild(inputElement);

var beginElement = document.createElement('button');
beginElement.textContent = '开始';
beginElement.style.cssText = 'position: absolute; border: 0; border-radius: 3px; height: 25px; width: 50px; top: 77px; left:970px; text-align: center; background-color: #409EFF; color: white; cursor: pointer; z-index: 99999;';
document.body.appendChild(beginElement);

var cancelElement = document.createElement('button');
cancelElement.textContent = '取消';
cancelElement.style.cssText = 'position: absolute; border: 0; border-radius: 3px; height: 25px; width: 50px; top: 77px; left:1030px; text-align: center; background-color: gray; color: white; cursor: not-allowed; z-index: 99999;';
document.body.appendChild(cancelElement);

let inter;
let timeout;

beginElement.addEventListener('click', () => {

    beginElement.disabled = true;
    beginElement.style.backgroundColor = 'gray';
    beginElement.style.cursor = 'not-allowed';
    inputElement.disabled = true;
    selectElement.disabled = true;
    cancelElement.disabled = false;
    cancelElement.style.backgroundColor = '#df504680';
    cancelElement.style.cursor = 'pointer';
    
    let list_data = {
        SFCT: "0",
        campus: "01",
        orderBy: "",
        pageNumber: 1,
        pageSize: 1000,
        teachingClassType: classT
    }
    switch (true) {
        case selectElement.value != 0: list_data.XGXKLB = selectElement.value;
        case inputElement.value != '': list_data.KEY = inputElement.value;
    }
    if(classT==="TJKC") {
        delete list_data.XGXKLB;
    }
    list_data = JSON.stringify(list_data);
    let i = -1;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jwxk.hrbeu.edu.cn/xsxk/elective/clazz/list', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Authorization', Authorization);
    xhr.setRequestHeader('Batchid', Batchid);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            inter = setInterval(() => {
                response.data.rows.forEach(org => {
                    i++;
                    timeout = setTimeout(() => {
                        const addXhr = new XMLHttpRequest();
                        addXhr.open('POST', 'https://jwxk.hrbeu.edu.cn/xsxk/elective/clazz/add', true);
                        addXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        addXhr.setRequestHeader('Authorization', Authorization);
                        addXhr.setRequestHeader('Batchid', Batchid);
                        addXhr.onreadystatechange = function () {
                            if (addXhr.readyState === 4 && addXhr.status === 200) {
                                const addResponse = JSON.parse(addXhr.responseText);
                                console.log(addResponse);

                                if (addResponse.msg === '已选满5门，不可再选') {
                                    cancelElement.click();
                                }
                            }
                        };
                        let addData =
                            'clazzType=' + encodeURIComponent(classT) +
                            '&clazzId=' + encodeURIComponent(org.JXBID) +
                            '&secretVal=' + encodeURIComponent(org.secretVal) +
                            '&chooseVolunteer=' + 1;

                        addXhr.send(addData);
                    }, i % response.data.rows.length * 200)
                });
            }, response.data.rows.length * 200);
        }
    };

    xhr.send(list_data);
})

cancelElement.addEventListener('click', () => {
    clearInterval(inter);
    clearTimeout(timeout);
    beginElement.disabled = false;
    beginElement.style.backgroundColor = '#409EFF';
    beginElement.style.cursor = 'pointer';
    inputElement.disabled = false;
    selectElement.disabled = false;
    cancelElement.disabled = true;
    cancelElement.style.backgroundColor = 'gray';
    cancelElement.style.cursor = 'not-allowed';
})


/*
专选：
const Authorization = document.cookie.split('=')[1];
const XGXKLB = { 默认: 0, A: 12, B: 13, C: 14, D: 15, E: 16, F: 17, A0: 18 };
const classT = 'TJKC';//专选：TJKC 公选：XGKC 跨选：FAWKC
const Batchid = 'c3a1f846edad4b5282e8d3ce44e3fd68';
var selectElement = document.createElement('select');
selectElement.id = 'classID';
for (let i in XGXKLB) {
    var optionElement = document.createElement('option');
    optionElement.value = XGXKLB[i];
    optionElement.text = i;
    selectElement.appendChild(optionElement);
}
selectElement.style.cssText = 'position: absolute; height: 25px; width: 50px; top: 77px; left:700px; text-align: center; z-index: 99999;';
document.body.appendChild(selectElement);

var inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.placeholder = '请输入关键字';
inputElement.style.cssText = 'position: absolute; height: 25px; width: 200px; top: 75px; left:760px; text-align: center; overflow: hidden; z-index: 99999;';
document.body.appendChild(inputElement);

var beginElement = document.createElement('button');
beginElement.textContent = '开始';
beginElement.style.cssText = 'position: absolute; border: 0; border-radius: 3px; height: 25px; width: 50px; top: 77px; left:970px; text-align: center; background-color: #409EFF; color: white; cursor: pointer; z-index: 99999;';
document.body.appendChild(beginElement);

var cancelElement = document.createElement('button');
cancelElement.textContent = '取消';
cancelElement.style.cssText = 'position: absolute; border: 0; border-radius: 3px; height: 25px; width: 50px; top: 77px; left:1030px; text-align: center; background-color: gray; color: white; cursor: not-allowed; z-index: 99999;';
document.body.appendChild(cancelElement);

let inter;
let timeout;

beginElement.addEventListener('click', () => {

    beginElement.disabled = true;
    beginElement.style.backgroundColor = 'gray';
    beginElement.style.cursor = 'not-allowed';
    inputElement.disabled = true;
    selectElement.disabled = true;
    cancelElement.disabled = false;
    cancelElement.style.backgroundColor = '#df504680';
    cancelElement.style.cursor = 'pointer';
    
    let list_data = {
        SFCT: "0",
        campus: "01",
        orderBy: "",
        pageNumber: 1,
        pageSize: 1000,
        teachingClassType: classT
    }
    switch (true) {
        case selectElement.value != 0: list_data.XGXKLB = selectElement.value;
        case inputElement.value != '': list_data.KEY = inputElement.value;
    }
    if(classT==="TJKC") {
        delete list_data.XGXKLB;
    }
    list_data = JSON.stringify(list_data);
    let i = -1;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jwxk.hrbeu.edu.cn/xsxk/elective/clazz/list', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Authorization', Authorization);
    xhr.setRequestHeader('Batchid', Batchid);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            inter = setInterval(() => {
                response.data.rows.forEach(org => {
                    org.tcList.forEach(org_ => {
                        i++;
                    timeout = setTimeout(() => {
                        const addXhr = new XMLHttpRequest();
                        addXhr.open('POST', 'https://jwxk.hrbeu.edu.cn/xsxk/elective/clazz/add', true);
                        addXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        addXhr.setRequestHeader('Authorization', Authorization);
                        addXhr.setRequestHeader('Batchid', Batchid);
                        addXhr.onreadystatechange = function () {
                            if (addXhr.readyState === 4 && addXhr.status === 200) {
                                const addResponse = JSON.parse(addXhr.responseText);
                                console.log(addResponse);

                                if (addResponse.msg === '已选满5门，不可再选') {
                                    cancelElement.click();
                                }
                            }
                        };
                        let addData =
                            'clazzType=' + encodeURIComponent(classT) +
                            '&clazzId=' + encodeURIComponent(org_.JXBID) +
                            '&secretVal=' + encodeURIComponent(org_.secretVal) +
                            '&chooseVolunteer=' + 1;

                        addXhr.send(addData);
                    }, i % response.data.rows.length * 200)
                    });
                    
                });
            }, response.data.rows.length * 200);
        }
    };

    xhr.send(list_data);
})

cancelElement.addEventListener('click', () => {
    clearInterval(inter);
    clearTimeout(timeout);
    beginElement.disabled = false;
    beginElement.style.backgroundColor = '#409EFF';
    beginElement.style.cursor = 'pointer';
    inputElement.disabled = false;
    selectElement.disabled = false;
    cancelElement.disabled = true;
    cancelElement.style.backgroundColor = 'gray';
    cancelElement.style.cursor = 'not-allowed';
})
*/
