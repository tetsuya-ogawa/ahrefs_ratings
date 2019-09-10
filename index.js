const DomainRepository = require('./domainRepository')
const PuppeteerHandler = require('./puppeteerHandler')

exports.handler = async (event, context) => {
  const domains = event['domains'].split(',')
  let results = [];
  
  const puppeteerHandler = new PuppeteerHandler()
  await puppeteerHandler.launchBrowser()
  
  const domainRepository = new DomainRepository(puppeteerHandler)
  
  try {
    for(let i = 0; i < domains.length; i++) {
      results.push(await domainRepository.fetch(domains[i]))
    }
  } catch (error) {
    return context.fail(error);
  } finally {
    await puppeteerHandler.closeBrowser()
  }
  
  return results;
};

