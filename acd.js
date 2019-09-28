var numOfStates;
var numOfInputs;
var a=[];
var inputSymbol=[];
var finalStates=[];
var front=-1, rear=-1;
var statelist=[];
var state_no=0;
var finalTable=[];
var bQueue=[];
var step=0;


$(".TableButton").on("click",function(){
	a=[]; inputSymbol=[]; finalStates=[]; front=-1, rear=-1; statelist=[]; state_no=0; bQueue=[]; finalTable=[]; step=0;
	$(".message").css("display","none"); $("table").css("display","none");  $(".ConvertSteps").css("display","none");
	$("input, button").css({ "padding": "12px 20px",   "margin-top": "7px 0"});  $(".displayQueue").css("display","none");  
	$("table").html("");
	$(".TableSubmit").css("display","inline"); 
	$(".Table").html("");
	
 numOfInputs=Number($(".inputs").val());
 numOfStates=Number($(".states").val());

	console.log(numOfInputs+" "+numOfStates);

	for(var i=0;i<numOfStates;i++)
	{   var classname="stateName";
        var stateval="State "+i+" ";
        console.log(stateval);
        if(i==0)
        	 {
        	 	for(var j=0; j<numOfInputs; j++)
        	     { var symbol="inputSymbol"+j;
        	     	$(".Table").append("<input class="+symbol+" type='text' required='true' placeholder='input "+j+" '>");
        	     	if(j==0)
        	     	$("."+symbol).css({"margin-left":"90px", "width": "100px"});
        	        else
        	        	$("."+symbol).css({"margin-left":"50px", "width": "100px"});
        	 	 }
        	  }

		$(".Table").append("<br><input class="+classname+" type='text' "+"value='"+stateval+"' required='true' readonly='readonly'>");
		 for(var j=0; j<numOfInputs; j++)
		 	{var inputclass="in"+i+j;
		 	 $(".Table").append("<input class="+inputclass+" type='text' placeholder='next states' required='true' style='width:150px'>");
		 	}

	}
	$(".Table").append("<br><input class='finalStates' type='text' placeholder='Enter final States' required='true'>");
	// $(".Table").append(''); 

});

$(".TableSubmit").on("click",function(){	
   //input symbols
   $("input, button").css({ "padding": "6px 10px",   "margin-top": "2px"});
   $(".ConvertSteps").css("display","inline");
   for(j=0; j<numOfInputs; j++)
   {  	inputSymbol.push($(".inputSymbol"+j).val());}
   console.log("Input Symbols :"+inputSymbol);

	for(var i=0; i<numOfStates; i++)
    {var a1=[];
    	for(var j=0; j<numOfInputs; j++)
    	{ var a2=[];
    		var str=$(".in"+i+j).val();
    		var pos=str.indexOf(",");
       		k=0;
    		while(k<str.length)
    		{	if(str[k]!=',')
    	          a2.push(Number(str[k]));
    	          k++;
    		}
    		a1.push(a2);
    	}
    	a.push(a1);
    }

    var str=$(".finalStates").val();
    k=0;
    while(k<str.length)
    {
    	if(str[k]!=',')
    		finalStates.push(Number(str[k]));
    		k++;
    }
    console.log(a);
})

function searchForArray(haystack, needle){
  var i, j, current;
  for(i = 0; i < haystack.length; ++i){
    if(needle.length === haystack[i].length){
      current = haystack[i];
      for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if(j === needle.length)
        return i;
    }
  }
  return -1;
}

function displayQueue()
{   $(".displayQueue").css("display","block");  
	var str="";
	for(var i=0; i<bQueue.length; i++)
	{   if(i==front&&front!=-1)
		{
			var str1="<span style='color:red'>q[";
		for(j=0; j<bQueue[i].length; j++)
		 str1=str1+bQueue[i][j];
		str1=str1+"]</span>";
		str=str+str1;
		}
		else{
		var str1="q[";
		for(j=0; j<bQueue[i].length; j++)
		 str1=str1+bQueue[i][j];
		str1=str1+"]\t\t\t\t";
		str=str+str1;	
		}
		
	}
	$(".displayQueue").html("<p>STATE QUEUE<p><li><span> </span> "+str+"</li>");
}

function displayTable()
{				$("table").css("display","table");
				///......................
				if(step===0)
				{	str1="";
					str1=str1+"<th>Present State</th>";
			        for(var j=0; j<numOfInputs; j++ )
					{ str1=str1+"<th>"+inputSymbol[j]+"</th>";
					}
					$("table").append("<tr> "+str1+"</tr>");

				}


				//if(step<finalTable.length)
				{ str="";
					for(var j=0; j<numOfInputs+1; j++)
					{ str1="<td>q[";
					  var k=0;
				      while(k<finalTable[step][j].length)
				      {str1=str1+finalTable[step][j][k];
				      	k++;
				      }
				      str1=str1+"]"+"</td>";
				      console.log(str1);
				      str=str+str1;
					}
					

				   $("table").append("<tr style='text-align:center; background-color: #87D37C; color:#000000'> "+str+"</tr>");
				   $("table").css("border","3px solid rgba(80,80,80,80)");
				  
				   step++;
				}

				///......................

}

function convertToState(current_state)
{   var str="q[";
	for(var i=0; i<current_state.length; i++)
		str=str+current_state[i];
	str=str+"]";
	return str;
}


$(".ConvertSteps").on("click",function(){

	if(front==-1)
	{
	statelist.push([0]); // state_no++;
	finalTable.push([[0]]);

	//initializing first row of final table
	rear=0;
	for(var j=0; j<numOfInputs; j++)
	{	finalTable[0].push(a[0][j]);
		bQueue.push(a[0][j]);
		rear++;
	}
	displayQueue();
	front=0;
	$(".message").css("display","inline");
	$(".message").text("First row has been initialzed\n");
	displayTable();
	// displayQueue();
	console.log("Final Table: "+finalTable);
	console.log("bQueue: "+bQueue);
	}

	else if(front!=rear)
	{   displayQueue();
		var current_state;
		current_state=bQueue[front];
		$(".message").html("<span style='background-color:#F5D76E' >Currently Processing State "+convertToState(current_state)+"</span><hr>");
		if(statelist.includes(current_state)==false)
		    {statelist.push(current_state);
		     finalTable.push([current_state]);
				for(j=0; j<numOfInputs; j++)		
				{ 	
					var newSet=[];
					$(".message").append("<br> <span style='background-color:#FAA945'>input = "+inputSymbol[j]+"</span>");
					for(var i=0; i<current_state.length; i++)
					{var msgstr=""; 
					 var state = current_state[i]; 
					  var arr=a[state][j];
					  //alert("input = "+j+ " state "+state+ " output :["+arr+"]");
					  msgstr=msgstr+("<br> for State "+state+" Next state :["+arr+"]");
						var newSet1=new Set(newSet);
						var newSet2= new Set(arr);
						newSet1= new Set([...newSet1, ...newSet2]);
						newSet=[...newSet1].sort();
					$(".message").append(msgstr);	
					}//end for

					$(".message").append("<br>UNION OF ALL Next States for Input "+inputSymbol[j]+" : [" + newSet+"]<hr><br>");
					finalTable[finalTable.length-1].push(newSet);
					
					if(searchForArray(bQueue,newSet)==-1)
					{	rear++;
						bQueue.push(newSet);
						displayQueue();
					} // end if

				}//end for
				front++;
				console.log("Statelist :"+statelist);
				console.log("bQueue: "+bQueue);
				console.log("front= "+ front+" rear: "+ rear);
				//alert("ok, 1 more state added");

				displayTable();
			}// end if
	}//end else if
})	

