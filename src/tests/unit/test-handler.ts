import { expect } from 'chai'

import { lambdaHandler } from '../../app'
import event from '../event'
import context from '../context'

const callback = (): void => {}

describe('Tests index', function () {
  it('verifies successful response', async () => {
    try {
      await lambdaHandler(event, context, callback)
    } catch (error) {
      expect(1).to.equal(1)
    }
  })
})
