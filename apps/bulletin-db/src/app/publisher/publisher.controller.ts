import { Controller, Get, Param } from '@nestjs/common'

@Controller('publisher')
export class PublisherController {
    @Get()
    findAll(): string {
        return 'Return all publishers'
    }
    @Get(':id')
    findById(@Param() params: GetPublisherByIdParams): string {
        return `Return publisher with id of: ${params.id}`
    }
}

interface GetPublisherByIdParams {
    id: string
}

// app.get('/publishers', (req, res) => {
// 	res.send(publishers);
// });
// app.get('/comments', (req, res) => {
// 	res.send(comments);
// });
// app.get('/publishers/:id', (req, res) => {
// 	const { id } = req.params;
// 	const publisher = publishers.find((p) => p.id === parseInt(id));
// 	res.send(publisher);
// });
