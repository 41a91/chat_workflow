function setCurrentNode(node) 
{
	let data = JSON.stringify({ node });
	
    $.ajax({
		type: "POST",
		url: "/set_current_node",
		data: { "node": data },
		success: () => displayCurrentNode(),
		dataType: "JSON"
	});
}

function displayPostSuccess()
{
	console.log("Post successful");
}
