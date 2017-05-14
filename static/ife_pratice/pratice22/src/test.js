var buttonSet =  document.getElementsByClassName('button-set')[0];
var preButton = buttonSet.firstElementChild,
	inButton = preButton.nextElementSibling,
	postButton = buttonSet.lastElementChild;


function display(i,sets){
	if(sets[i]){
		/*首先判断存在性*/
		sets[i].classList.add('background-blue');

		/*延时处理*/
		setTimeout(function(i,sets){
			/*到时间后，先去掉蓝色*/
			sets[i-1].classList.remove('background-blue');
			/*然后立即递归，这样才能实现，一个接一个的显示*/
			/*因为没有同步的延时函数，面对setTimeout只能这样处理*/ 
			display(i,sets);
			// 传入数组，和索引
		}, 300, i+1, sets);
	}
}

preButton.addEventListener('click', function(){

	var root = document.body.children[1];
	var order = null;

	/*这个是没有判断根节点，而是判断的左右子节点的合法性，不是很简便*/
	// function preOrder(root){
	// 	var order = [];

	// 	(function preTraverse(ele){
	// 		var left = ele.firstElementChild;
	// 		var right = ele.lastElementChild;

	// 		order.push(ele);
	// 		if(left){
	// 			preTraverse(left);
	// 		}
	// 		if(right){
	// 			preTraverse(right);
	// 		}
	// 	})(root);
		
	// 	return order;
	// }

	/*判断根节点的合法性*/ 
	function preOrder(root){
		var order = [];
		function preTraversal(root){

			if(!root){
				return 
			}
			/*注意声明的顺序一定要等到判断root不是null*/ 
			var leftSon = root.firstElementChild;
			var rightSon = root.lastElementChild;
			
			
			order.push(root);
			preTraversal(leftSon);
			preTraversal(rightSon);
		}
		preTraversal(root);
		return order;
	}

	order = preOrder(root);
	display(0, order);

},false);

inButton.addEventListener('click', function(){

	var root = document.body.children[1];
	var order = null;

	function inOrder(root){
		var order = [];
		function inTraversal(root){
			if(!root){
				return;
			}
			var leftSon = root.firstElementChild;
			var rightSon = root.lastElementChild;

			inTraversal(leftSon);
			order.push(root);
			inTraversal(rightSon);
		}
		inTraversal(root);
		return order;
	}

	order = inOrder(root);
	display(0,order);
},false);


postButton.addEventListener('click', function(){
	var root = document.body.children[1];
	var order = null;

	function postOrder(root){
		var order = [];
		function postTraversal(root){
			if(!root)
				return;
			var leftSon = root.firstElementChild;
			var rightSon = root.lastElementChild;

			postTraversal(leftSon);
			postTraversal(rightSon);
			order.push(root);
		}
		postTraversal(root);
		return order;
	}

	order = postOrder(root);
	display(0,order);

},false)