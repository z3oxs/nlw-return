import { Router, Request, Response } from 'express';
import { NodemailerMailAdapter } from './adapters/nodeMailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const router: Router = Router();

router.post('/feedbacks', async (req: Request, res: Response) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter,
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });

    res.status(201).send();
});
