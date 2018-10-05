<?php
header('Access-Control-Allow-Origin:*');

//获取基本信息
//$post_url=$_post["post_url"];
$post_url="http://catalog.ngac.org.cn/clients/getMetadatas";
$post_data=$_post["post_data"];
//设置获取函数
function send_post($url,$post_data) {
    $postdata = http_build_query($post_data);
    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type:application/x-www-form-urlencoded',
            'content' => $postdata,
            'timeout' => 15 * 60 // 超时时间（单位:s）
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
 
    return $result;
}
 
  
 /*
  $post_data = array(
      'MdIdnt' => 'cgdoi.n0001/x00080686',
      'MdTitle' => '水资源紧缺',
      
  );
 */
$data =send_post($post_url,$post_data);
echo $data;

?>