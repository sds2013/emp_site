getLogs(1);//로그 조회 함수

function getLogs(pageNum){
    $.ajax({
        url : "http://192.168.0.37:8080/api/v1/logs?page="+pageNum,
        type : "GET",
        dataType : "json",
        success : function(response){
            //console.log(response)
            $('#boardData').empty();
            $('.pagination').empty();
            var html = '';
            for(var i=0; i<response.list.length; i++){
                html += '<tr onclick = "getPopup( '+response.list[i].logId+' )"><td>'+response.list[i].logId+'</td><td>'+response.list[i].ip+'</td><td>'+response.list[i].url+'</td><td>'+response.list[i].httpMethod+'</td><td>'+response.list[i].createAt+'</td></tr>'
            }
            $('#boardData').append(html);

            var paginationHtml = '';
            if(response.hasPreviousPage){ // 이전 번트 확인 여부
                paginationHtml += '<a onclick="getLogs('+(pageNum-1)+')">Previous</a>';
            }
            for(var i=0; i<response.navigatepageNums.length; i++){
                var page = response.navigatepageNums[i];
                paginationHtml += '<a id="pageNum'+page+'" onclick="getLogs('+page+')">'+page+'</a>'
            }
            if(response.hasNextPage){ //다음 버튼 확인 여부
                paginationHtml += '<a onclick="getLogs('+(pageNum+1)+')">Next</a>';
            }
            $('.pagination').append(paginationHtml); // 페이징 바인딕 작업
            //현재 페이지번호 CSS 적용
            $('#pageNum'+pageNum).css('backgroundColor','#287bff')
            $('#pageNum'+pageNum).css('color','#fff')

        }
    });
}

//성세정보 조회
function getPopup(logId){
    $('.logs-popup').css('display', 'block');
    $('#map').empty();

    $.ajax({
        url : "http://192.168.0.37:8080/api/v1/logs/"+logId,
        type : "GET",
        dataType : "json",
        success : function(response){
            console.log(response);
            //ID가 ip,createAt인 ipput태그에 값을 set함
            $('#ip').val(response.ip);
            $('#createAt').val(response.createAt)
        }
    })

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.3286904, 127.4229992), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(36.3286904, 127.4229992); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}
