function numberWithPoints(x) {
    let changeText = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return "$ " + changeText;
}

export default numberWithPoints;