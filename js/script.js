$(document).one('pageinit', function(){
	
	//Display runs
	showRuns();
	// Add Handler
	$('#submitAdd').on('tap', addRun);
	
	// Edit Handler
	$('#submitEdit').on('tap', editRun);
	
	// Delete Handler
	$('#stats').on('tap','#deleteLink', deleteRun);
	
	// Set Current Handler
	$('#stats').on('tap','#editLink', setCurrent);
	
	// Clear Handler
	$('#clearRuns').on('tap', clearRuns);
	
	/*
	 *Show all runs on homepage
	*/
	function showRuns(){
		
		var runs = getRunsObject();
		//Check if empty
		if(runs != '' && runs !=null){
			for(var i=0;i < runs.length; i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
								   '<br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">'+
								   '<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'"  data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'"  data-date="'+runs[i]["date"]+'" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
			}
		$('#home').bind('pageinit', function(){
			$('#stats').listview('refresh');
		});
		}else{
			$('#stats').html('<p>You have no logged runs</p>');
		}
	}
	
	/*
	 *Add a run
	*/
	function addRun(){
		//Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		
		//create 'run' object
		var run = {
			date: date,
			miles: parseFloat(miles)
		};
			
		var runs = getRunsObject();
		//Add run to runs array
		runs.push(run);
		
		alert('Run Added');
		
		//Set stringified objects to local storage
		localStorage.setItem('runs', JSON.stringify(runs));
		
		//Redirect
		window.location.href="index.html";
		
		return false;
	}
	
	/*
	 *Edit a run
	*/
	function editRun(){
		
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		var runs = getRunsObject();
		//Loop through runs
		for(var i=0; i<runs.length; i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i, 1);
			}
			
			localStorage.setItem('runs', JSON.stringify(runs));
		}
		
		
		
		//Add run to runs array
		
		//Get form values
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();
		
		//create 'run' object
		var update_run = {
			date: date,
			miles: parseFloat(miles)
		};
		runs.push(update_run);
		
		alert('Run Updated');
		
		//Set stringified objects to local storage
		localStorage.setItem('runs', JSON.stringify(runs));
		
		//Redirect
		window.location.href="index.html";
		
		return false;
	}
	
		/*
	 *Delete a run
	*/
	function deleteRun(){
		
			
		//Set  ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		//Get  ls items
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		var runs = getRunsObject();
		//Loop through runs
		for(var i=0; i<runs.length; i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i, 1);
			}
			
			localStorage.setItem('runs', JSON.stringify(runs));
		}
		
		
	
		
		alert('Run Deleted');
		
		
		//Redirect
		window.location.href="index.html";
		
		return false;
	}
	
	/*
	 *Delete all runs
	*/
	
	function clearRuns(){
		localStorage.removeItem('runs');
		$('#stats').html('<p>You have no logged runs</p>');
	}
	
	
	
	
	/*
	 *Get the runs object
	*/
	function getRunsObject(){
		//Set runs array
		var runs = new Array();
		//Get current runs from localStorage
		var currentRuns = localStorage.getItem('runs');
		
		//Check localstorage
		if(currentRuns != null){
			//Set to runs
			var runs = JSON.parse(currentRuns);
		}
		//Return runs object
		return runs.sort(function(a,b){return new Date(b.date) - new Date(a.date)});
	}
	
	/*
	 * Set the current clicked miles and date
	*/
	function setCurrent(){
		//Set  ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		//Insert form fields
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	}
	
	
});