$(document).ready(function () {
    $(".sortable-list").sortable({
        connectWith: ".sortable-list",
        update: function (event, ui) {
            // Update sequence order or perform other actions as needed.
            updateSequenceOrder(ui.item);
        }
    }).disableSelection();

    function updateSequenceOrder(updatedItem) {
        const sequenceId = updatedItem.attr('data-sequence-id');

        // Update the position of the corresponding items in both lists
        updateItemPosition('main-items', sequenceId, updatedItem.text());
        updateItemPosition('sequence-customizer', sequenceId, updatedItem.text());

        // Use the updatedOrder array as needed (e.g., send an AJAX request to update the backend)
        console.log('Updated Sequence Order (main-items):', getSequenceOrder('main-items'));
        console.log('Updated Sequence Order (sequence-customizer):', getSequenceOrder('sequence-customizer'));
    }

    function updateItemPosition(listId, sequenceId, newText) {
        // Update the position of the corresponding item in the specified list
        const correspondingItem = findItemBySequenceId(listId, sequenceId);
        if (correspondingItem) {
            // Update the order of the item in your data structure or backend
            // For simplicity, let's just update the text content here
            correspondingItem.text(newText);
        }
    }

    function findItemBySequenceId(listId, sequenceId) {
        // Find the corresponding item by sequence id in the specified list
        return $(`#${listId} .sortable-list div[data-sequence-id="${sequenceId}"]`);
    }

    function getSequenceOrder(listId) {
        // Get the current order of items in the specified list
        return $(`#${listId} .sortable-list div`).map(function () {
            return $(this).attr('data-sequence-id');
        }).get();
    }
});
