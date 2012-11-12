<?php

FLEA::loadClass('Controller_BoBase');
class Controller_InterfaceForAndroid extends Controller_BoBase
{
	//轮播
    function actionLunbo(){
			$tableModaDoor = FLEA::getSingleton('Table_ModaDoor');	
			$doorDat = $tableModaDoor->IndexTest();
			$data_arrary['count'] = 4;
			$data_arrary['message'] = '';
			for($i = 1; $i<=4; $i++){
				$data_arrary['data'][$i-1]["sort"] = $i;
				$data_arrary['data'][$i-1]["url"] = "http://moda.we54.com/".$doorDat['img_'.$i];
				$data_arrary['data'][$i-1]["target"] = $doorDat['img'.$i.'_link'];
			}
			echo json_encode($data_arrary);
	}
	
	
    function actionShowlist(){
		$tableModaUser = FLEA::getSingleton('Table_ModaUser');
		$tableModaShow = FLEA::getSingleton('Table_ModaShows');		
		if($_GET["sort"])
			$sort = (int)$_GET['sort'];
		else
			$sort = 1;
		$pagesize	=	36;
		$conditions	=	"available = 1 and public = 1";
		if($sort == 1)
			$sortby		=	"show_id DESC";
		if($sort == 2)
			$sortby		=	"views DESC";
		if($sort == 3)
			$sortby		=	"discuss_count DESC";
		FLEA::loadClass('Lib_Pager');
		FLEA::loadClass('Lib_ModaPager2');
		$page	=	new Lib_ModaPager2( $tableModaShow, $pagesize, $conditions , $sortby );
		$rowset	=	$page->rowset;
		$temp = 0;
		foreach($rowset as $dat)
		{
				$nickname = $tableModaUser->getUserByUserId($dat['user_id']);
				$rowset[$temp]['nickname'] = $nickname['nickname'];	
				$temp ++;
		}
		$data_arrary['总页数'] = $page->pageCount;
		$data_arrary['当前页数'] = $page->currentPage;
		$data_arrary['排序'] = $sort;
		$i = 0;
		foreach($rowset as $v){
			$data_arrary['data'][$i]["id"] = $v['show_id'];
			$data_arrary['data'][$i]["image_url"] = "http://moda.we54.com/".$v['show_img'];
			$data_arrary['data'][$i]["title"] = iconv('gbk','utf-8',$v['nickname'].'-'.$v['title']);
			$data_arrary['data'][$i]["browse_number"] = $v['views'];
			$data_arrary['data'][$i]["ablum_url"] = "http://moda.we54.com/?Controller=InterfaceForAndroid&action=Showpage&show_id=".$v['show_id'];
			$i++;
		}
		echo json_encode($data_arrary);
				
	}
	
	
    function actionShowpage(){
		$show_id = (int)$_GET['show_id'];
		$tableModaShows = FLEA::getSingleton('Table_ModaShows');
		$showDE = $tableModaShows->getShowByShowId($show_id);
		$AttachmentsData	=	array();//附件表
		$tableModaAttach = FLEA::getSingleton('Table_ModaAttachments');
		$AttachmentsData = $tableModaAttach->getAttachAllByShowId($show_id);
		$row = $tableModaShows->getShowByShowId($show_id);
		$row['views']+=3;
		$tableModaShows->updatetar($row);
		if($showDE['main'] == 1){
			foreach($AttachmentsData as $data){
				if((int)$data['atc_type'] == 3)
					$url = $this->_UbbCover(stripslashes($data['img_url']));
			}
			$data_arrary['is_offcial'] = '是';
			$data_arrary['video_image'] = '';
			$data_arrary['video_url'] = $url;
		}
		else{
			$data_arrary['is_offcial'] = '否';
			$data_arrary['video_image'] = '';
			$data_arrary['video_url'] = '';
		}
		$i = 0;
		foreach($AttachmentsData as $data){
			if((int)$data['atc_type'] == 2){
				$data_arrary['data'][$i]["image"] = $data['img_url'];
				$i++;
			}
		}
		echo json_encode($data_arrary);
	}
		
	
	function _UbbCover($str)
	{
			FLEA::loadClass('Lib_Ubb');
			$Ubb = new Lib_Ubb();
			$Ubb->setString($str);
			$str2 = $Ubb->parse();
			return $str2;
	}
		
		
	
	
	
}
?>
