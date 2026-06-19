<?php
// require_once "../config/db.php";
if(isset($_POST['submit'])){

    function security($defence){
        $defence = htmlspecialchars($defence);
        $defence = trim($defence);
        $defence = stripslashes($defence);
    }
    
    $category = security($_POST['category']);
    $fullName = security($_POST['full_name']);
    $email = security($_POST['email']);
    $phone = security($_POST['phone']);
    $amount = security($_POST['amount']);
    $donateType = security($_POST['donation_type']);
    $paymentMethod = security($_POST['payment_method']);

    echo "data".$category;
    echo "name".$fullName;
}

// if($conn){
//     if(empty($category) || empty($fullName) || empty($email) || empty($phone) || empty($amount) || empty($donateType) || empty(paymentMethod) ){
//         exit();
//     }else if(!filter_var($email, FILTER_VALIDATE_EMAIL == true)){
//         echo "<h4>Invalid email address<h4>";
//     }else{
//         $query = "INSERT INTO donate(?,?,?,?,?,?,?) VALUE($category,$fullName,$email,$phone,$amount,$donateType,$paymentMethod)";
//         $result =mysqli_query($conn, $query);

//     }
// }
?>