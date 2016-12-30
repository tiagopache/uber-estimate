var controls = {

    getEstimativeCard: function (name, estimate, multiplier) {

        var $mainDiv = $("<div></div>")
                        .addClass("col-lg-4 col-md-4 col-sm-4");

        var $componentDiv = $("<div></div>")
                                .addClass("bs-component")
                                .appendTo($mainDiv);

        var $panelDiv = $("<div></div>")
                            .addClass("panel panel-default")
                            .appendTo($componentDiv);

        var $panelHeadingDiv = $("<div></div>")
                                    .addClass("panel-heading")
                                    .html("<strong>"+name+"</strong>")
                                    .appendTo($panelDiv);

        var $panelBodyDiv = $("<div></div>").addClass("panel-body").appendTo($panelDiv);

        var $dl = $("<dl></dl>").appendTo($panelBodyDiv);

        $("<dt></dt>").text("Estimativa").appendTo($dl);
        $("<dd></dd>").text(estimate).appendTo($dl);

        if ((multiplier !== null || multiplier !== 'undefined') && multiplier > 1)
        {
            var $img = $("<img></img>").addClass("img-circle profile-photo pull-right")
                    .prop("alt", "")
                    .prop("src", "./images/surge_multiplier.png")
                    .appendTo($panelHeadingDiv);
            
            $("<dt></dt>").text("Multiplicador").appendTo($dl);

            var multi = multiplier + " x";
            
            $("<dd></dd>").text(multi).appendTo($dl);
        }        
        
        return $mainDiv;
    }

}