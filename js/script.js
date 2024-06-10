// without localStorage 
// $(document).ready(function () {
//     let no = 1;
//     $("#myForm").submit(function (event) {
//         event.preventDefault();
//         let fName = $("#fname").val();
//         let lName = $("#lname").val();
//         let email = $("#email").val();
//         let address = $("#address").val();

//         var store = "";
//         store = '<tr><td>' + no + '</td><td class="showFname">' + fName + '</td><td><class="showLname">' + lName + '</td><td class="showEmail">' + email + '</td><td class="showAddress">' + address + '</td><td><button class="deleteBtn">Delete</button></td></tr>';
//         $('.tableBody').append(store);
//         no++;
//         // delete Data
//         $(".deleteBtn").click(function () {
//             $(this).closest('tr').remove();
//         });
//     });

//     // addData 
//     $("#addData").click(function (event) {
//         event.preventDefault();
//         $("#fname").val('');
//         $("#lname").val('');
//         $("#email").val('');
//         $("#address").val('');
//     });

//     // search Data
//     $("#search").on("keyup", function () {
//         var value = $(this).val().toLowerCase();
//         $(".tableBody tr").filter(function () {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });

// });

// with localStorage 


$(document).ready(function () {
    let arrData = JSON.parse(localStorage.getItem("person")) || [];
    let no = arrData.length + 1;
    $("#myForm").submit(function (event) {
        event.preventDefault();
        let fName = $("#fname").val();
        let lName = $("#lname").val();
        let email = $("#email").val();
        let address = $("#address").val();

        const newData = {
            id: no,
            fName: fName,
            lName: lName,
            email: email,
            address: address
        }
        arrData.push(newData);
        localStorage.setItem("person", JSON.stringify(arrData));

        let store = "";
        store = '<tr><td>' + no + '</td><td class="showFname">' + fName + '</td><td><class="showLname">' + lName + '</td><td class="showEmail">' + email + '</td><td class="showAddress">' + address + '</td><td><button class="deleteBtn" data-id=' + no + '">Delete</button></td></tr>';
        $('.tableBody').append(store);
        no++;
    });

    // addData 
    $("#addData").click(function (event) {
        event.preventDefault();
        $("#fname").val('');
        $("#lname").val('');
        $("#email").val('');
        $("#address").val('');
    });

    // // search Data
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".tableBody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // delete Data
    $(".tableBody").on("click", ".deleteBtn", function () {
        let idToDelete = $(this).attr("data-id");
        arrData = arrData.filter(function (data) {
            return data.id != idToDelete;
        });

        // Save data to local storage
        localStorage.setItem("person", JSON.stringify(arrData));

        $(this).closest('tr').remove();
    });

    // pageload then show 
    for (let i = 0; i < arrData.length; i++) {
        let data = arrData[i];
        console.log("data", data);
        let store = "";
        store = '<tr><td>' + data.id + '</td><td class="showFname">' + data.fName + '</td><td class="showLname">' + data.lName + '</td><td class="showEmail">' + data.email + '</td><td class="showAddress">' + data.address + '</td><td><button class="deleteBtn" data-id="' + data.id + '">Delete</button></td></tr>';
        $('.tableBody').append(store);
    }
});

