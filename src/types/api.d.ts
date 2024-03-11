interface IHandler {
  (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void | NextApiResponse<any>>;
}
