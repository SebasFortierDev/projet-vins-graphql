
const vinContainer = document.getElementById("vinContainer");

const instanceAxios = axios.create({
    baseURL: "http://localhost:3000",

})

function getVins() {
    instanceAxios.post('/graphql', {
        query: `query {
                    getVin(id: "b011735eae2b62daeede") {
                        id
                        name
                    }
                }`,
    }).then(response => {
        console.log(response.data.data.getVin);
    }).catch(error => console.log('error', error))
}

getVins();
