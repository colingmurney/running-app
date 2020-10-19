function handleSelectAll(selectAll, activities) {
    if (selectAll) {
      for (let activity of activities) {
        activity.isSelected = false;
      }
    } else {
      for (let activity of activities) {
        activity.isSelected = true;
      } 
    }
    return activities
}

function fillOrEmptyIndex(selectAll, activities) {
    const selectedIndex = []
    if (!selectAll) {
      for (let i=0; i< activities.length; i++) {
        if (activities[i] !== undefined) {
          selectedIndex.push(i);
        }
      }
    }
    return selectedIndex;
}

export {handleSelectAll, fillOrEmptyIndex};