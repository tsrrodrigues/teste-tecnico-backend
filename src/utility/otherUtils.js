const calculateRequestTime = (initialTime) => {
  return new Date().getTime() - initialTime;
}

module.exports = { calculateRequestTime }