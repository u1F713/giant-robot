import { gql } from '@apollo/client'
import { createClient } from '../src/index'

describe('Client create', () => {
  const query = gql`
    {
      repository(
        owner: "u1F713"
        name: "Anime-Girls-Holding-Programming-Books"
      ) {
        createdAt
      }
    }
  `

  test('query github api', async () => {
    const client = createClient()
    const resp = await client.query({ query })

    console.log(resp)
    expect(resp).toBeDefined()
  })
})
