document.addEventListener('DOMContentLoaded', function () {
    const sequenceCustomizer = document.getElementById('sequence-customizer');

    let draggingElement = null;

    sequenceCustomizer.addEventListener('dragstart', function (event) {
        draggingElement = event.target;
        draggingElement.classList.add('dragging');
    });

    sequenceCustomizer.addEventListener('dragover', function (event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(sequenceCustomizer, event.clientY);
        const container = afterElement ? afterElement.parentElement : sequenceCustomizer;
        container.insertBefore(draggingElement, afterElement);
    });

    sequenceCustomizer.addEventListener('dragend', function () {
        draggingElement.classList.remove('dragging');
        draggingElement = null;

        // Update sequence order or perform other actions as needed.
        updateSequenceOrder();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.sequence-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function updateSequenceOrder() {
        const mainItems = document.querySelectorAll('.main-item');
        const sequenceItems = document.querySelectorAll('.sequence-item');

        // Create an array to store the updated sequence order
        const updatedOrder = [];

        // Iterate through the sequence items and update the order
        sequenceItems.forEach((sequenceItem, index) => {
            const sequenceId = sequenceItem.getAttribute('data-sequence-id');
            const correspondingMainItem = findMainItemBySequenceId(mainItems, sequenceId);

            // Update the position of the corresponding main item
            if (correspondingMainItem) {
                // Update the order of the main item in your data structure or backend
                // For simplicity, let's just update the text content here
                correspondingMainItem.textContent = `Item ${index + 1}`;

                // Add the updated sequence id to the array
                updatedOrder.push(sequenceId);
            }
        });

        // Use the updatedOrder array as needed (e.g., send an AJAX request to update the backend)
        console.log('Updated Sequence Order:', updatedOrder);
    }

    function findMainItemBySequenceId(mainItems, sequenceId) {
        // Iterate through the main items to find the one with the matching sequence id
        return Array.from(mainItems).find(mainItem => {
            return mainItem.getAttribute('data-sequence-id') === sequenceId;
        });
    }
});
