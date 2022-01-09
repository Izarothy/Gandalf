const quoteSchema = require('./Schema/Quote.js');

module.exports.fetchQuote = async () => {
  const quote = await quoteSchema.findOne({});
  if (quote) {
    return quote;
  } else {
    return null;
  }
};

module.exports.addQuote = async (question, answer) => {
  const quote = new quoteSchema({
    question,
    answer,
  });
  await quote.save();
};

module.exports.deleteQuote = async (question) => {
  await quoteSchema.deleteOne({ question: question });
};
