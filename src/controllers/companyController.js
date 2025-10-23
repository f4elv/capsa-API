import prisma from "../prisma/client.js";

export const createCompany = async (req, res) => {
    const { name, description } = req.body;

    try {
        const company = await prisma.company.create({
            data: {
                name, 
                description,
                ownerId: req.userId,
            },
        });


        res.status(201).json({ message: "Empresa criada com sucesso", company });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar empresa", error: error.message });
    }
};

export const listCompanies = async (req, res) => {
    try {
        const companies = await prisma.company.findMany();
        res.status(200).json({ companies });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar empresas", error: error.message });
    }
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) return res.status(404).json({ error: "Empresa não encontrada." });

    if (company.ownerId !== req.userId) return res.status(403).json({ error: "Acesso negado." });

    const updated = await prisma.company.update({
      where: { id },
      data: { name, description },
    });

    res.status(200).json({ message: "Empresa atualizada com sucesso", updated });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao atualizar empresa",
      details: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await prisma.company.findUnique({ where: { id } });
        if (!company) return res.status(404).json({ error: "Empresa não encontrada." });

        if (company.ownerId !== req.userId) return res.status(403).json({ error: "Acesso negado." });

        await prisma.company.delete({ where: { id } });

        res.status(200).json({ message: "Empresa deletada com sucesso." });
    } catch (error) {
        res.status(500).json({
        error: "Erro ao deletar empresa",
        details: error.message,
        });
    }
};