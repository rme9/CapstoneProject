package com.example.omarg.scavenge_client;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_list);  //Changing views to the list view
        FloatingActionButton fab = findViewById(R.id.fab);  //Floating Action Button. Downloads a list of rooms

        //Sets actions for when button has been clicked
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Database updated", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
                EditText text = findViewById(R.id.editText);
                create(text.getText().toString());

            }
        });
    }
public void create(String URL)
{

    Toolbar toolbar = findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);
    ListView list = findViewById(R.id.Dynamic);
    String[] ListElements = new String[]{
    };

    ArrayList<Building> buildList = new Handler().main(URL); //creates an array list of rooms

    //Checks that the array list of buildings is not empty
    if(buildList != null) {
        //Creates a list of strings to be displayed on the app list
        final List<String> ListElementsArrayList = new ArrayList<String>(Arrays.asList(ListElements));

        //Creates an adapter to handle the action on the list
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>
                (ListActivity.this, android.R.layout.simple_list_item_1, ListElementsArrayList);

        //sets the adapter for the list as adapter
        list.setAdapter(adapter);
        //Adds a string to the list to show off the rooms information
        for (int i = 0; i < buildList.size(); i++) {
            ListElementsArrayList.add("id : " + buildList.get(i).get_id() + "\nbuilding id : " + buildList.get(i).getBuilding_id() + "\nDescription : " +
                    buildList.get(i).getDescription() + "\nLocation type : " + buildList.get(i).getLocation_type() + "\nRoom Number : " + buildList.get(i).getRoom());
        }

        adapter.notifyDataSetChanged();
    }
    else
    {

    }
}
}
