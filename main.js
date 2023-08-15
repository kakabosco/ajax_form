// Pure JS

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("btn-cep").addEventListener("click", function () {
//         // AJAX - Asynchronous JavaScript and XML
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById("cep").value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

//         xhttp.open("GET", endpoint);
//         xhttp.send();
//     });
// });

$(document).ready(function () {
    $("#cep").mask("00000-000");

    $("#btn-cep").click(function () {
        const cep = $("#cep").val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const button = $(this);

        $(button).find("i").addClass("d-none");
        $(button).find("span").removeClass("d-none");

        // AJAX

        // $.ajax(endpoint).done(function (answer) {
        //     setTimeout(function () {
        //         const logradouro = answer.logradouro;
        //         const bairro = answer.bairro;
        //         const cidade = answer.localidade;
        //         const estado = answer.uf;
        //         const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        //         $("#endereco").val(endereco);

        //         $(button).find("i").removeClass("d-none");
        //         $(button).find("span").addClass("d-none");
        //     }, 1000);
        // });

        // Fetch API
        fetch(endpoint)
            .then(function (answer) {
                return answer.json();
            })
            .then(function (json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                $("#endereco").val(endereco);
            })
            .catch(function (error) {
                alert("Ocorreu um erro ao buscar o endereço, tente novamente.");
            })
            .finally(function () {
                setTimeout(function () {
                    $(button).find("i").removeClass("d-none");
                    $(button).find("span").addClass("d-none");
                }, 500);
            });
    });

    $("#form-request").submit(function (e) {
        e.preventDefault();

        if ($("#name").val().length == 0) {
            throw new Error("O campo nome é obrigatório");
        }
    });
});
