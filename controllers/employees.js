const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desr получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

/**
 * @route POST /api/employees/add
 * @desr добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstname || !data.lastname || !data.address || !data.age) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    // await prisma.user.update({
    //     where: {
    //         id: req.user.id
    //     },
    //     data: {
    //         createdEmployee: {
    //             create: data
    //         }
    //     }
    // });

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Не добавить сотрудника" });
  }
};

/**
 * @route GET /api/employees/:id
 * @desr Получение сотрудника по id
 * @access Private
 */

const employee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({ where: { id } });

    res.status(200).json(employee);
  } catch {
    return res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

/**
 * @route POST /api/employees/remove
 * @desr Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};

/**
 * @route PUT /api/employees/edit
 * @desr Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = req.body;


    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch {
    return res.status(500).json({ message: "Не удалось отредактировать" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee
};
