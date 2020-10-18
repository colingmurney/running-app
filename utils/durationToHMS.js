function durationToHMS( duration, isMilliseconds ) { 
    let seconds = duration

    // 1- Convert to seconds:
    if (isMilliseconds) seconds = seconds / 1000;
    // 2- Extract hours:    
    let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.round(seconds % 60);
  
    if (seconds < 10) seconds = `0${seconds}`
    if (minutes < 10) minutes = `0${minutes}`
  
    
    if (hours === 0) return `${minutes}:${seconds}`
    return `${hours}:${minutes}:${seconds}`
}

module.exports = durationToHMS;
