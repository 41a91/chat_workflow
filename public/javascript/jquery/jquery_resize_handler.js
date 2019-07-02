$(document).ready(function() 
{
	// Set resizable and nested resizable elements
	setResizableElement(".resizable", false, true, 20, 20, 500, 500);
	setResizableElement(".nested_resizable", true, true, 20, 20, 500, 500);
	
	
	
	
	
	
	



	/** 
	 * setResizableElement
	 * @summary Documentation 						https://api.jqueryui.com/resizable
	 * @param {String} jqueryIdentifier 			An element identified by a string (Example: ".droppable" || "#myContainer") that should allow its 
	 * 												children elements to be sorted
	 * @param {Boolean} shouldRestrainToParent		Should the resizable element be bound to not being sized outside of its parent element?
	 * @param {Boolean} shouldHideHandles			Should the handles that resize the element be hidden when it isn't being hovered over?
	 * @param {Number} minWidth						The minimum width of the resizable element
	 * @param {Number} minHeight					The minimum height of the resizable element
	 * @param {Number} maxWidth						The maximum width of the resizable element
	 * @param {Number} maxHeight					The maximum height of the resizable element
	 */
	function setResizableElement(jqueryIdentifier, shouldRestrainToParent, shouldHideHandles, minWidth, minHeight, maxWidth, maxHeight)
	{
		// Set the containment
		let containmentString = "document";
		
		if (shouldRestrainToParent)
		{
			containmentString = "parent";
		}
		
		// Set the resizable
		$(jqueryIdentifier).resizable(
		{			
			// Keep the resizable element within its parent
			containment: containmentString,
			
			// Whether the handles to resize should be hidden or not
			autoHide: shouldHideHandles,
			
			// Set the min & max values
			minWidth: minWidth,
			minHeight: minHeight,
			maxWidth: maxWidth,
			maxHeight: maxHeight,
			
			// Set the sides that the element can be resized on (all but the top)
			handles: "w, e, s, se, sw"
		});
	
	}
	
});
