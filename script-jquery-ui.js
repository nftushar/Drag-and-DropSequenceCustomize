$(document).ready(function () {
    // Load the content of main-items.html into #main-items
    $("#main-items").load("main-items.html");

    // Load the content of sequence-customizer.html into #sequence-customizer
    $("#sequence-customizer").load("sequence-customizer.html");

    const mainItemsContainer = $("#main-items");
    const sequenceCustomizer = $("#sequence-customizer");

    sequenceCustomizer.sortable({
        connectWith: mainItemsContainer,
        update: function (event, ui) {
            updateSequenceOrder();
        },
    });

    function updateSequenceOrder() {
        const mainItems = $(".main-item");
        const sequenceItems = $(".sequence-item");

        const updatedOrder = [];

        sequenceItems.each(function (index) {
            const sequenceId = $(this).data("sequence-id");
            const correspondingMainItem = findMainItemBySequenceId(mainItems, sequenceId);

            if (correspondingMainItem) {
                correspondingMainItem.appendTo(mainItemsContainer);
                updatedOrder.push(sequenceId);
            }
        });

        console.log("Updated Sequence Order:", updatedOrder);
    }

    function findMainItemBySequenceId(mainItems, sequenceId) {
        return mainItems.filter(function () {
            return $(this).data("sequence-id") === sequenceId;
        });
    }
});
