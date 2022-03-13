<?php include('include/header.php'); 
?>


<div class="container">
    <h2 id="statusText">Let's Play</h2>
    <button class="btn btn-primary " id="restartbutton">Restart</button>
    <div class="row">
        <div class="col-md-12 ">
            <div id="gameboard">
                <div class="box" id="0"></div>
                <div class="box" id="1"></div>
                <div class="box" id="2"></div>
                <div class="box" id="3"></div>
                <div class="box" id="4"></div>
                <div class="box" id="5"></div>
                <div class="box" id="6"></div>
                <div class="box" id="7"></div>
                <div class="box" id="8"></div>
            </div>
        </div>
    </div>
</div>



<script src="./public/js/ai.js"></script>
<?php include('include/footer.php'); ?>