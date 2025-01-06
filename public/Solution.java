import java.util.*;

public class Solution {
    public static String getTown(String[] names) {
        // Sort the names alphabetically
        Arrays.sort(names);

        // Take the first and the last names after sorting
        String first = names[0].toLowerCase();
        String last = names[names.length - 1].toLowerCase();

        // Find the common prefix between the first and last name
        int i = 0;
        while (i < first.length() && i < last.length() && first.charAt(i) == last.charAt(i)) {
            i++;
        }

        // Return the common prefix
        return first.substring(0, i);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Input for number of people
        int n = scanner.nextInt();
        scanner.nextLine(); // consume newline
        
        // Input for names
        String[] names = scanner.nextLine().split(" ");
        
        // Get the longest common prefix (town name)
        String townName = getTown(names);
        
        // Print the result
        if (!townName.isEmpty()) {
            System.out.println(townName);
        }
    }
}

