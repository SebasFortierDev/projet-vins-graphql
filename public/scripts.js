const vinContainer = document.getElementById("vinContainer");
document.getElementById("createVinButton").addEventListener("click", createVin);

const instanceAxios = axios.create({
    baseURL: "http://localhost:3000",

})

function getVins() {
    instanceAxios.post('/graphql', {
        query: `query {
                    getVins {
                        id
                        name
                        year
                        grade
                    }
                }`,
    }).then(response => {
        showVins(response.data.data.getVins);
    }).catch(error => console.log('error', error))
}

function createVin() {
    const vinName = "Salut!!"

    instanceAxios.post('/graphql', {
        query: `mutation CreateVin($vinName: String!) {
                    createVin(input: {
                        name: $vinName
                        year: 1995
                        grade: 5
                      }) {
                            id
                            name
                          }
                    }`,
        variables: {vinName: vinName},
    }).then(response => {
        getVins(response)
    }).catch(error => console.log('error', error))
}

function showVins(vins) {
    for (const vin of vins) {
        let tagName = document.createElement("p");
        tagName.innerText = "Nom du vin: " + vin.name

        let tagYear = document.createElement("p");
        tagYear.innerText = "Année: " + vin.year

        let tagGrade = document.createElement("p");
        tagGrade.innerText = "Note: " + vin.grade + "/" + "5"

        vinContainer.append(tagName);
        vinContainer.append(tagYear);
        vinContainer.append(tagGrade);
        vinContainer.append(document.createElement("br"))
    }
}

getVins();
