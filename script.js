(function($){
	//初期化
	var init = function(){
		//ベースとなる画像のプリロード
		baseImg = new Image();
		baseImg.src = 'image.jpg';
		stage = new createjs.Stage('result');
	}
	
	//画像と文字を合成する処理
	var genImage = function(){
		var img = new createjs.Bitmap(baseImg);
		
		stage.addChild(img);
		
		//合成する文字の位置情報などを定義
		//input[type="text"]のnameをキーとし、X座標、Y座標、フォントサイズ、行揃えを持たせている。
		//色などそれ以上の設定が必要な場合は配列で持たせておくと管理しやすい、と思う。
		var txt = {
			'txt01' : {
				'x' : 300,
				'y': 5,
				'size': '20px',
				'align': 'center'
			},
			'txt02' : {
				'x' : 300,
				'y': 35,
				'size': '36px',
				'align': 'center'
			},
			'txt03' : {
				'x' : 363,
				'y': 166,
				'size': '20px',
				'align': 'left'
			},
			'txt04' : {
				'x' : 363,
				'y': 245,
				'size': '20px',
				'align': 'left'
			}
		}
		
		//上記の配列より文字オブジェクトを生成し、stageにaddChildする
		$.each(txt,function(key,value){
			//本文は入力された内容をそのまま取る
			var content = $('#' + key).val();
			
			//固定文言がある場合はkeyで判別して追加したりするといいと思う
			if(key == 'txt01' && content){
				var content = content + '100人に聞きました。';
			}
 
			//必要があれば指定文字数ごとに"\n"をいれると改行されます。
			//10文字で改行をいれるなら以下のように。
			if(key == 'txt03' || key == 'txt04'){
				var content = content.replace(/[\r|\r\n|\n]/g, "").replace(/(.{10})/g, "$1" + "\n");			
			}
		
			//文字オブジェクト生成
			var obj = new createjs.Text(content);
			
			//文字の属性を設定する
			obj.textAlign = value.align;
			obj.font = 'bold ' + value.size + '/1.5 Meiryo,sans-serif';  //CSSのfontのショートハンドと同じ
			obj.x = value.x; //X座標
			obj.y = value.y; //Y座標
			
			stage.addChild(obj);
		});
		}
 
		
		//保存させる処理
		//ここだけはブラウザ上で完結できなかった…。
		//base64をデコードしてheaderを付加してechoするだけのPHPへPOSTしています
		var save = function(){
			var png = stage.toDataURL('image/png'); //base64エンコードした画像データ生成
			if(png){
				$('input[name="img"]').remove();
				$('#saveform').append('<input type="hidden" name="img" value="'+png+'" />');
				return true;
			} else {
				return false;
			}
		}
	
	$(function(){
		//canvasオブジェクトを事前に定義しておく
		$(window).on('load',function(){
			init();
		});
		
		//画像生成ボタンが押されたときにcanvas生成
		$('#update').on('click',function(e){
			//改めてnewすることでキャッシュが残って変な感じにならない…多分。
			stage = new createjs.Stage('result');
			genImage();
			stage.update();
		});
		
		//「画像として保存」ボタンが押された時の処理
		$('#saveform').on('submit',function(){
			save();
		});
	});
})(jQuery);