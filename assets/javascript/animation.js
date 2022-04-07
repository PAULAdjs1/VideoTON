$(document).ready(() => {
	$(".col")
		.on("mouseenter", function () {
			$(this).nextAll().addClass("has-positive-translate");
			$(this).prevAll().addClass("has-negative-translate");
		})
		.on("mouseleave", function () {
			removeHasClasses();
		});

	function removeHasClasses() {
		$(".col").removeClass("has-negative-translate has-positive-translate");
	}
});
