function api(path, method="GET", body = null){
    const url = "http://www.localhost:8080/employees/" + path;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    if (body != null) {
        options.body = JSON.stringify(body);
    }
    
    return fetch(url, options);
}

export async function getAllEmployees(){
    try{

        let response = await api('getAll', "GET");
        let data = await response.json();

        return{
            status: response.status,
            success:true,
            body: data

       };

    }catch(err){
        return {success:false, message: err};
    }
}