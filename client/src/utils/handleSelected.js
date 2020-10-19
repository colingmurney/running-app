function toggleSelected(index, activities) {

    activities[index].isSelected = !activities[index].isSelected;
    return activities
}

function updateSelectedIndex(index, selectedIndex) {
    
    if (selectedIndex.includes(index)) {
        const removeIndex = selectedIndex.indexOf(index)
        selectedIndex.splice(removeIndex, 1)
      } else {
        selectedIndex.push(index)
      }
      return selectedIndex
}

export {toggleSelected, updateSelectedIndex}