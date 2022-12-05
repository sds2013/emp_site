getDept(1);
function updateDept(){
    $('.update-popup').css('display', 'block');
}
//부서 전체 나오게
function getDept(pageNum){
    $.ajax({
        url: 'http://localhost:8080/api/v1/deptpage?page='+pageNum,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            $('#deptData').empty(); //기존걸 지우고 업한다!! 
            $('.pagination').empty();
            console.log(response);
            var html = '';
            for(var i=0; i<response.list.length; i++){
                html += '<tr onclick="getEmpByEmpno('+response.list[i].deptno+')"><td>'+response.list[i].deptno+'</td><td>'+response.list[i].dname+'</td><td>'+response.list[i].loc
                +'</td><td>'+response.list[i].empno+'</td></tr>'
            }
            $('#deptData').append(html);
             var paginationHtml ='';
            if(response.hasPreviousPage){ // 이전 버튼 여부 확인
               paginationHtml += '<a onclick="getEmp('+(pageNum-1)+')">Previous</a>';
            }
            for(var i=0; i<response.navigatepageNums.length; i++){ //총 보여줄 페이지
               var page = response.navigatepageNums[i];
               paginationHtml += '<a onclick="getEmp('+page+')">'+page+'</a>';
            }
            if(response.hasNextPage){//다음 버튼 여부 확인
               paginationHtml += '<a onclick="getEmp('+(pageNum+1)+')">Next</a>';
            }
            $('.pagination').append(paginationHtml); //페이지 바인딩 작업 
        }
    });
}
//해당 부서 누르면 뿌려주게 
function getEmpByEmpno(deptno){
    console.log('클릭한 부서 번호는?' +deptno);
    $.ajax({
        url : 'http://localhost:8080/api/v1/dept/'+deptno,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            console.log(response);
            $('.update-popup').css('display','block');
            //데이터 바인딩
            $('#u_deptno').val(response.deptno);
            $('#u_dname').val(response.dname);
            $('#u_loc').val(response.loc);
        }
    }); 
}
//부서 입력
function setDept(){
    var deptno = $('#i_deptno').val();
    var dname = $('#i_dname').val();
    var loc = $('#i_loc').val();
    if(deptno == ''){
        alert('부서 번호를 입력해주세요.')
        $('#i_deptno').focus();
        return false;
    }
    if(dname == ''){
        alert('부서 이름을 입력해주세요.')
        $('#i_dname').focus();
        return false;
    }
    if(loc == ''){
        alert('부서 지역을 입력해주세요.')
        $('#i_loc').focus();
        return false;
    }
    
    var jsonData = {
        "deptno" : deptno,
        "dname" : dname,
        "loc" : loc
    }
    console.log(jsonData);

    $.ajax({
        url : 'http://localhost:8080/api/v1/dept',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(jsonData),
        success : function(response){
            if(response > 0){
                alert("새로운 일개미부서 등록");
                location.reload();
            }
            else {
                alert("이미 등록된 일개미부서")
            }
        }
        
    });
}
//부서 수정 (==insert 비슷함) 부서 번호는 막음 왜? PK를 수정한다는건 주민번호를 수정한다는말임 멍청한짓 ㄴ
function update(){
    var deptno = $('#u_deptno').val();
    var dname = $('#u_dname').val();
    var loc = $('#u_loc').val();

    var jsonData = {
        "deptno" : deptno,
        "dname" : dname,
        "loc" : loc
    }
    $.ajax({
        url : 'http://localhost:8080/api/v1/dept',//주소 변경해야함. 백엔드에 있어야함.
        type : 'PATCH',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(jsonData),
        success : function(response){
            console.log(response);
        if(response > 0)
            alert("수정 완료.");
            location.reload(); //자바 스크립트에서 제공해주는 새로 고침
        }
        
    }); 
}
//부서 삭제
function deleteEmp(){
    var deptno = $('#u_deptno').val();

    $.ajax({
        url : 'http://localhost:8080/api/v1/dept/'+deptno,
        type : 'DELETE',
        dataType : 'json',
        success : function(response){
        if(response > 0)
            alert("부서가 삭제되었다....");
            location.reload(); 
            //자바 스크립트에서 제공해주는 새로 고침
        }
    })
}



















