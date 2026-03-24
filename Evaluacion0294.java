import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

public class Evaluacion0294 {

    static String nombre;
    static String apellidoPaterno;
    static String apellidoMaterno;
    static LocalDate fechaNacimiento;
    static Scanner leer = new Scanner(System.in);
    static DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static void main(String[] args) {
        int opcion;

        do {
            mostrarMenu();
            opcion = leerOpcion();
            procesarOpcion(opcion);
        } while (opcion != 4);

        leer.close();
        System.out.println("Adiós, programa terminado.");
    }

    static void mostrarMenu() {
        System.out.println("\n===== MENU =====");
        System.out.println("1. Escribir mis datos personales");
        System.out.println("2. Calcular volumen de figuras");
        System.out.println("3. Ver mis datos personales");
        System.out.println("4. Salir del programa");
        System.out.print("Elige una opción: ");
    }

    static int leerOpcion() {
        int opcion = 0;
        boolean opcionValida = false;

        while (!opcionValida) {
            if (leer.hasNextInt()) {
                opcion = leer.nextInt();
                leer.nextLine();

                if (opcion >= 1 && opcion <= 4) {
                    opcionValida = true;
                } else {
                    System.out.print("Opción no válida. Intenta otra: ");
                }
            } else {
                System.out.print("Eso no es un número: ");
                leer.next();
            }
        }
        return opcion;
    }

    static void procesarOpcion(int opcion) {
        switch (opcion) {
            case 1: ingresarDatos(); break;
            case 2: calcularVolumen(); break;
            case 3: mostrarDatos(); break;
        }
    }

    static void ingresarDatos() {
        System.out.print("Nombre: ");
        nombre = leer.nextLine();

        System.out.print("Apellido paterno: ");
        apellidoPaterno = leer.nextLine();

        System.out.print("Apellido materno: ");
        apellidoMaterno = leer.nextLine();

        System.out.print("Fecha (dd/MM/yyyy): ");
        String fechaTexto = leer.nextLine();

        try {
            fechaNacimiento = LocalDate.parse(fechaTexto, formatoFecha);
        } catch (DateTimeParseException e) {
            System.out.println("Fecha inválida.");
        }
    }

    static void calcularVolumen() {
        System.out.println("1. Cono  2. Cilindro");
        int figura = leer.nextInt();

        System.out.print("Radio: ");
        double r = leer.nextDouble();
        System.out.print("Altura: ");
        double h = leer.nextDouble();

        double volumen = 0;

        if (figura == 1) {
            volumen = (1.0 / 3.0) * Math.PI * r * r * h;
        } else if (figura == 2) {
            volumen = Math.PI * r * r * h;
        }

        System.out.println("Volumen: " + volumen);
    }

    static void mostrarDatos() {
        System.out.println("Nombre: " + nombre + " " + apellidoPaterno + " " + apellidoMaterno);
        if (fechaNacimiento != null) {
            System.out.println("Fecha: " + fechaNacimiento.format(formatoFecha));
        }
    }
}