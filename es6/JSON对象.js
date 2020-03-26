
    let str = '{"a": 12, "b": 5, "c": "abc"}';
    let json = JSON.parse(str);
    console.log(json);



    let json = { a: 12, b: 5 };
    console.log(JSON.stringify(json));



    let json = { a: 12, b: 5 };
    let str = 'http://it.kaikeba.com/path/user?data=' + encodeURIComponent(JSON.stringify(json));
    console.log(str);
