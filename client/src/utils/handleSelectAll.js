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

export default handleSelectAll;