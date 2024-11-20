const isSylva = (message) => {
  return (
    message.from === process.env.SYLVA_GROUP_FROM &&
    message.author === process.env.SYLVA_GROUP_AUTHOR &&
    message.hasMedia &&
    message.type === 'image'
  )
}

const isOtter = (message) => {
  return message.body.toLowerCase().includes('lontra')
}

const getSylvaKeyPhrase = (message) => {
  const body = message.body
  const match = body.match(/escrev[ao]:\s*(.+)/i)

  return match ? match[1].trim() : null
}

module.exports = {
  isSylva,
  isOtter,
  getSylvaKeyPhrase
}