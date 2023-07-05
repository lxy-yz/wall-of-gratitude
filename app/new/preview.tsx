import { GratitudeFormValues } from "@/components/gratitude-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export type UISetting = Pick<GratitudeFormValues, 'bg' | 'typeface' | 'fontSize'>

export const Preview = ({
  setting,
}: {
  setting: UISetting
}) => {
  // const form = useFormContext()
  // const { } = form.getValues()

  const { color = 'blue' } = setting || {}
  return (
    <Card className={cn(`h-[320px] w-[320px] mx-auto
      bg-${color}-300 dark:bg-${color}-600
    `)}>
      {/* <Menubar className="mt-4 py-6 px-3">
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.palette className='h-4 w-4' />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="bg"
              render={({ field }) => (
                <>
                  <MenubarRadioGroup
                    // @ts-ignore
                    onValueChange={(value: Colors) => field.onChange(value)}
                    value={field.value}
                  >
                    {Object.entries(Colors).map(([colorDisplay, colorValue]) => {
                      return (
                        <MenubarRadioItem key={colorValue} value={colorValue} className={`text-${colorValue}-500`}>
                          {colorDisplay}
                        </MenubarRadioItem>
                      );
                    })}
                  </MenubarRadioGroup>
                </>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.type className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="typeface"
              render={({ field }) => (
                <MenubarRadioGroup
                  // @ts-ignore
                  onValueChange={(value: Typeface) => field.onChange(value)}
                  value={field.value}
                >
                  {Object.entries(Typeface).map(([typefaceDisplay, typefaceValue]) => {
                    return (
                      <MenubarRadioItem className={`font-${typefaceValue}`} key={typefaceValue} value={typefaceValue}>
                        {typefaceDisplay}
                      </MenubarRadioItem>
                    );
                  })}
                </MenubarRadioGroup>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.baseline className='h-4 w-4' />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="fontSize"
              render={({ field }) => (
                <MenubarRadioGroup
                  // @ts-ignore
                  onValueChange={(value: FontSize) => field.onChange(value)}
                  value={field.value}
                >
                  {Object.entries(FontSize).map(([fontDisplay, fontValue]) => {
                    return (
                      <MenubarRadioItem className={`text-${fontValue}`} key={fontValue} value={fontValue}>
                        {fontDisplay}
                      </MenubarRadioItem>
                    );
                  })}
                </MenubarRadioGroup>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <div className="cursor-pointer px-3 py-2" onClick={() => form.setValue('content', '')}>
          <Icons.clear className="h-4 w-4" />
        </div>
        <div className="flex gap-2 flex-1 justify-end">
          <Button variant="secondary" size="sm">
            <Save className="h-4 w-4" />
          </Button>
          <Button form="hook-form" type="submit" variant="default" size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Menubar> */}
    </Card>
  )
}